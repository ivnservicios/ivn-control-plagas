"""Offline regression checks for the static site. Python standard library only."""

from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://ivnservicios.cl"


def canonical_for_path(path):
    if path == "index.html":
        return ORIGIN + "/"
    if path.endswith("/index.html"):
        return ORIGIN + "/" + path.removesuffix("index.html")
    return ORIGIN + "/" + path


def local_target(source, value):
    resolved = urlsplit(urljoin(canonical_for_path(source), value))
    if resolved.scheme not in ("https", "http") or resolved.netloc not in ("", "ivnservicios.cl"):
        return None, ""
    target = unquote(resolved.path).lstrip("/")
    if not target or target.endswith("/"):
        target += "index.html"
    return target, unquote(resolved.fragment)


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.schemas = []
        self.title = ""
        self.capture = None
        self.payload = ""
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == "title" or (tag == "script" and attrs.get("type") == "application/ld+json"):
            self.capture = tag
            self.payload = ""

    def handle_data(self, data):
        if self.capture:
            self.payload += data

    def handle_endtag(self, tag):
        if tag == self.capture:
            if tag == "title":
                self.title = self.payload.strip()
            else:
                self.schemas.append(json.loads(self.payload))
            self.capture = None

    def attrs(self, tag):
        return [attrs for name, attrs in self.tags if name == tag]


def audit():
    errors = []
    pages = {}
    for path in sorted(ROOT.rglob("*.html")):
        try:
            relative = path.relative_to(ROOT).as_posix()
            pages[relative] = Page(path.read_text(encoding="utf-8-sig"))
        except (ValueError, UnicodeError) as exc:
            errors.append(f"{path.name}: parsing failed: {exc}")
    sitemap = ET.parse(ROOT / "sitemap.xml")
    urls = [item.text for item in sitemap.findall(".//{*}loc")]
    if len(urls) != len(set(urls)):
        errors.append("Duplicate sitemap URLs")
    incoming = Counter()
    titles = Counter()
    descriptions = Counter()
    for name, page in pages.items():
        def fail(message):
            errors.append(f"{name}: {message}")
        ids = [a["id"] for _, a in page.tags if "id" in a]
        if len(ids) != len(set(ids)):
            fail("duplicate IDs")
        if len(page.attrs("h1")) != 1:
            fail("expected one H1")
        if not page.title:
            fail("missing title")
        for image in page.attrs("img"):
            if not all(key in image for key in ("alt", "width", "height")):
                fail(f"image lacks alt/dimensions: {image.get('src')}")
        for tag, attrs in page.tags:
            value = attrs.get("href") if tag in ("a", "link") else attrs.get("src")
            if not value:
                continue
            target, fragment = local_target(name, value)
            if target is None:
                continue
            if not (ROOT / target).is_file():
                fail(f"missing local target: {value}")
            if tag == "a" and target in pages:
                if target != name:
                    incoming[target] += 1
                if fragment and not any(a.get("id") == fragment for _, a in pages[target].tags):
                    fail(f"missing fragment: {value}")
        canonical = [a.get("href") for a in page.attrs("link") if a.get("rel") == "canonical"]
        expected = canonical_for_path(name)
        if canonical != [expected]:
            fail("canonical mismatch")
        if expected in urls:
            titles[page.title] += 1
            description = [a.get("content", "") for a in page.attrs("meta") if a.get("name") == "description"]
            if len(description) != 1 or not description[0]:
                fail("missing/duplicate description")
            else:
                descriptions[description[0]] += 1
            if any("noindex" in a.get("content", "") for a in page.attrs("meta") if a.get("name") in ("robots", "googlebot")):
                fail("sitemap page has noindex")
        else:
            if not any("noindex" in a.get("content", "") for a in page.attrs("meta") if a.get("name") == "robots"):
                fail("page outside sitemap lacks noindex")
    for url in urls:
        name = urlsplit(url).path.lstrip("/") or "index.html"
        if name.endswith("/"):
            name += "index.html"
        if name not in pages:
            errors.append(f"Sitemap target missing: {url}")
        elif not incoming[name]:
            errors.append(f"Orphan page: {url}")
    for label, counter in (("title", titles), ("description", descriptions)):
        errors.extend(f"Duplicate {label}: {text}" for text, count in counter.items() if count > 1)
    print(f"Checked {len(pages)} HTML files, {len(urls)} sitemap URLs, local links, fragments, metadata, JSON-LD and image dimensions.")
    for error in errors:
        print("ERROR:", error)
    print(f"Errors: {len(errors)}")
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(audit())
