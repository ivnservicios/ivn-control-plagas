const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

function setup() {
  const events = {};
  const classes = new Set();
  const attrs = {};
  let focused = false;
  const link = { addEventListener: (name, fn) => { events.link = fn; } };
  const toggle = {
    addEventListener: (name, fn) => { events.toggle = fn; },
    setAttribute: (name, value) => { attrs[name] = value; },
    contains: target => target === toggle,
    focus: () => { focused = true; }
  };
  const menu = {
    classList: {
      toggle: name => { if (classes.has(name)) { classes.delete(name); return false; } classes.add(name); return true; },
      contains: name => classes.has(name), remove: name => classes.delete(name)
    },
    querySelectorAll: () => [link], contains: target => target === link || target === menu
  };
  const document = { addEventListener: (name, fn) => { events[name] = fn; } };
  const start = source.indexOf('  if (toggle && menu)');
  const end = source.indexOf('  const year =');
  vm.runInNewContext(source.slice(start, end), { toggle, menu, document });
  return { events, attrs, menu, link, focused: () => focused };
}

test('toggle updates expanded state and accessible name', () => {
  const s = setup(); s.events.toggle();
  assert.equal(s.attrs['aria-expanded'], 'true');
  assert.equal(s.attrs['aria-label'], 'Cerrar menu');
  s.events.toggle(); assert.equal(s.attrs['aria-expanded'], 'false');
});
test('Escape closes and restores focus', () => {
  const s = setup(); s.events.toggle(); s.events.keydown({ key: 'Escape' });
  assert.equal(s.attrs['aria-expanded'], 'false'); assert.equal(s.focused(), true);
});
test('outside click closes without stealing focus', () => {
  const s = setup(); s.events.toggle(); s.events.click({ target: {} });
  assert.equal(s.attrs['aria-expanded'], 'false'); assert.equal(s.focused(), false);
});
test('internal focus keeps menu open; external focus closes it', () => {
  const s = setup(); s.events.toggle(); s.events.focusin({ target: s.link });
  assert.equal(s.attrs['aria-expanded'], 'true');
  s.events.focusin({ target: {} }); assert.equal(s.attrs['aria-expanded'], 'false');
});
test('navigation closes menu', () => {
  const s = setup(); s.events.toggle(); s.events.link();
  assert.equal(s.attrs['aria-expanded'], 'false');
  assert.equal(s.attrs['aria-label'], 'Abrir menu');
});
