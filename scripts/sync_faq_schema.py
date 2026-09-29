"""Check FAQ JSON-LD against visible #faq articles; use --write to synchronize.

Run from any directory with Python 3. No third-party dependencies are required.
"""

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re


class FAQParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.section_depth = 0
        self.article = None
        self.capture = None
        self.entries = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section":
            if self.section_depth or attrs.get("id") == "faq":
                self.section_depth += 1
        if not self.section_depth:
            return
        if tag == "article":
            self.article = {"h3": [], "p": []}
        elif self.article is not None and tag in ("h3", "p"):
            self.capture = tag

    def handle_data(self, data):
        if self.article is not None and self.capture:
            self.article[self.capture].append(data)

    def handle_endtag(self, tag):
        if tag == self.capture:
            self.article[self.capture].append(" ")
            self.capture = None
        if tag == "article" and self.article is not None:
            question = " ".join("".join(self.article["h3"]).split())
            answer = " ".join("".join(self.article["p"]).split())
            if not question or not answer:
                raise ValueError("FAQ article is missing its heading or answer")
            self.entries.append({
                "@type": "Question", "name": question,
                "acceptedAnswer": {"@type": "Answer", "text": answer},
            })
            self.article = None
        if tag == "section" and self.section_depth:
            self.section_depth -= 1


SCHEMA = re.compile(r'(<script\s+type="application/ld\+json"\s*>)(.*?)(</script>)', re.S)


def synchronize(source):
    parser = FAQParser()
    parser.feed(source)
    newline = "\r\n" if "\r\n" in source else "\n"
    count = 0

    def replace(match):
        nonlocal count
        schema = json.loads(match[2])
        if schema.get("@type") != "FAQPage":
            return match[0]
        count += 1
        if not parser.entries:
            raise ValueError("FAQPage exists without visible FAQ articles")
        if schema.get("mainEntity") == parser.entries:
            return match[0]
        schema["mainEntity"] = parser.entries
        payload = json.dumps(schema, ensure_ascii=False, indent=2).replace("<", "\\u003c")
        return match[1] + newline + payload.replace("\n", newline) + newline + "  " + match[3]

    result = SCHEMA.sub(replace, source)
    if count > 1 or (parser.entries and count != 1):
        raise ValueError("Expected one FAQPage for the visible FAQ section")
    return result, len(parser.entries)


def main():
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument("--write", action="store_true", help="Update JSON-LD from visible content")
    options = args.parse_args()
    root = Path(__file__).resolve().parent.parent
    changed = []
    total = 0
    # Validate every document before writing any changes.
    updates = []
    for path in sorted(root.rglob("*.html")):
        source = path.read_bytes().decode("utf-8")
        result, entries = synchronize(source)
        total += entries
        if result != source:
            changed.append(path.relative_to(root).as_posix())
            updates.append((path, result))
    if options.write:
        for path, result in updates:
            path.write_bytes(result.encode("utf-8"))
    print(f"FAQ questions checked: {total}; pages {'updated' if options.write else 'out of sync'}: {len(changed)}")
    for name in changed:
        print(name)
    return 0 if options.write or not changed else 1


if __name__ == "__main__":
    raise SystemExit(main())
