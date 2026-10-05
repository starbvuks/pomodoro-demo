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

The background code currently restores the timer from `isActive` instead of its stored numeric value, and the completion path does not persist `isActive: false`. Those are concrete maintenance tasks before calling this a dependable timer.

### try the original

Clone the repository, open `chrome://extensions`, enable Developer mode and choose **Load unpacked**, selecting this repository's folder. Keep the limitations above in mind when exploring it.

---

[more experiments](https://github.com/starbvuks)
