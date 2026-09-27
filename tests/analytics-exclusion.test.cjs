const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const start = source.indexOf('  const analyticsPreference =');
const end = source.indexOf('  const setHiddenField =');
assert.ok(start >= 0 && end > start);

function run(search, stored, hostname = 'ivnservicios.cl', blocked = false) {
  const values = new Map(stored ? [['ivn_analytics_disabled', stored]] : []);
  const scripts = [];
  const access = () => { if (blocked) throw new Error('Storage unavailable'); };
  const window = {
    location: { search, hostname, pathname: '/', origin: `https://${hostname}` },
    localStorage: {
      getItem(key) { access(); return values.get(key) || null; },
      setItem(key, value) { access(); values.set(key, value); },
      removeItem(key) { access(); values.delete(key); }
    }
  };
  const document = {
    title: 'IVN Servicios', referrer: '', querySelector: () => null,
    createElement: () => ({}), head: { appendChild: element => scripts.push(element) }
  };
  const context = { window, document, URL, URLSearchParams };
  vm.runInNewContext(source.slice(start, end) + '\nwindow.tracked = trackEvent("click_whatsapp");', context);
  return { window, scripts, values };
}

test('normal production traffic loads GA4 and records events', () => {
  const result = run('');
  assert.equal(result.scripts.length, 1);
  assert.equal(result.window.tracked, true);
});
test('explicit opt-out suppresses script and events and persists', () => {
  const result = run('?ivn_analytics=off');
  assert.equal(result.scripts.length, 0);
  assert.equal(result.window.tracked, false);
  assert.equal(result.values.get('ivn_analytics_disabled'), '1');
});
test('stored opt-out survives navigation without a query', () => {
  assert.equal(run('', '1').window.tracked, false);
});
test('explicit opt-in clears previous opt-out', () => {
  const result = run('?ivn_analytics=on', '1');
  assert.equal(result.window.tracked, true);
  assert.equal(result.values.has('ivn_analytics_disabled'), false);
});
test('URL opt-out works without browser storage', () => {
  assert.equal(run('?ivn_analytics=off', null, 'ivnservicios.cl', true).window.tracked, false);
});
test('unavailable storage does not break ordinary analytics', () => {
  assert.equal(run('', null, 'ivnservicios.cl', true).window.tracked, true);
});
test('localhost and lookalike domains remain excluded', () => {
  for (const host of ['localhost', '127.0.0.1', 'ivnservicios.cl.example.com']) {
    assert.equal(run('?ivn_analytics=on', null, host).window.tracked, false);
  }
});
test('www production host remains enabled', () => {
  assert.equal(run('', null, 'www.ivnservicios.cl').window.tracked, true);
});
