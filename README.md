# pomodoro

A browser timer with somewhere to put your tasks. An early Chrome extension experiment from 2021.

A small popup combines a 25-minute countdown, start/pause/reset controls and an editable task list. Task text is saved through Chrome's sync storage; timer state uses local storage.

### inside

- `popup/` — timer controls, task editing and deletion.
- `background.js` — alarm handling and notification logic.
- `options/` — the original options-page scaffold.
- `manifest.json` — Manifest V3, with storage, alarms and notification permissions.

### status

Learning prototype. The source has been reviewed for this presentation; it has not been verified as a reliable timer on current Chrome.

The worker restores saved elapsed seconds and persists a paused state when a session finishes. Run the controlled state tests with Node.js 18 or later:

```sh
node --test tests/background.test.cjs
```

These execute the background script against simulated storage, alarms and notifications. They cover active and paused restarts, reset state and completion; they do not verify Chrome's alarm timing, service-worker lifecycle or notification delivery.

### try the original

Clone the repository, open `chrome://extensions`, enable Developer mode and choose **Load unpacked**, selecting this repository's folder. Keep the limitations above in mind when exploring it.

---

[more experiments](https://github.com/starbvuks)
