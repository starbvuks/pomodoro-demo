const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');

const source = readFileSync(join(__dirname, '..', 'background.js'), 'utf8');

function worker(initial = {}) {
  const storage = { ...initial };
  const notifications = [];
  let onAlarm;
  const context = {
    chrome: {
      alarms: {
        create() {},
        onAlarm: { addListener(listener) { onAlarm = listener; } },
      },
      storage: { local: {
        get(keys, callback) {
          callback(Object.fromEntries(keys.filter(key => key in storage)
            .map(key => [key, storage[key]])));
        },
        set(values) { Object.assign(storage, values); },
      } },
    },
    registration: {
      showNotification(title, options) { notifications.push({ title, options }); },
    },
  };
  function restart() { runInNewContext(source, context); }
  restart();
  return { storage, notifications, restart,
    alarm(name = 'pTimer') { onAlarm({ name }); } };
}

test('fresh storage starts paused at zero', () => {
  const { storage } = worker();
  assert.deepEqual(storage, { timer: 0, isActive: false });
});

for (const isActive of [false, true]) {
  test(`restart preserves numeric elapsed time while ${isActive ? 'active' : 'paused'}`, () => {
    const app = worker({ timer: 731, isActive });
    assert.deepEqual(app.storage, { timer: 731, isActive });
    app.restart();
    assert.deepEqual(app.storage, { timer: 731, isActive });
    app.alarm();
    assert.deepEqual(app.storage, { timer: isActive ? 732 : 731, isActive });
  });
}

test('completion persists a stopped timer and notifies only once', () => {
  const app = worker();
  Object.assign(app.storage, { timer: 1499, isActive: true });
  app.alarm();
  assert.deepEqual(app.storage, { timer: 0, isActive: false });
  assert.equal(app.notifications.length, 1);
  assert.equal(app.notifications[0].title, 'Pomodoro Timer');
  app.alarm();
  app.restart();
  app.alarm();
  assert.deepEqual(app.storage, { timer: 0, isActive: false });
  assert.equal(app.notifications.length, 1);
});

test('the reset state remains paused across alarms and restart', () => {
  const app = worker({ timer: 42, isActive: true });
  // The popup reset control writes this pair of values.
  Object.assign(app.storage, { timer: 0, isActive: false });
  app.alarm();
  app.restart();
  app.alarm();
  assert.deepEqual(app.storage, { timer: 0, isActive: false });
  assert.equal(app.notifications.length, 0);
});

test('unrelated alarms do not advance the timer', () => {
  const app = worker();
  Object.assign(app.storage, { timer: 42, isActive: true });
  app.alarm('anotherAlarm');
  assert.deepEqual(app.storage, { timer: 42, isActive: true });
  assert.equal(app.notifications.length, 0);
});
