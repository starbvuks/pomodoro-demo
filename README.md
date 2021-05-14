# Pomodoro Timer Chrome Extension

#### Video Demo: https://youtu.be/_WZTX_NUAw8

#### Description:

• This Pomodoro Timer allows users to start a timer for a set time of 25 minutes and save notes / to-do's in the inbuilt Task Tracker. You can add, remove and edit tasks at your ease and at the bottom is a live clock added for good measure to make sure you're keeping track of the time you spent throughout the day.

• This extension was build with Javascript and the Chrome API provided via Manifest V3.

### •`manifest.json`:
This file is responsible for holding required data to run the extension i.e; name, version, icon AND the permissions needed (storage, alarms) for functionality. The key here is the `service_worker: "background.js"`  which connects the background script to the JSON.

### • `background.js`:
As the name suggests, everything that happens in the **background** is done through this file. Here, the `alarm` function listens for when the number in the timer hits exactly 25 minutes passed. When this number is hit, chrome puts out a notification stating *"25 Minutes Have Passed"* and resets the timer to 0. Also `isActive`is set to false, signaling that the timer is currently inactive. All of this is stored in the local Chrome data with `chrome.storage.local.set` so the browser remembers when the function is active / inactive.

### • `popup.js` *(and the other popup files)* :
The **popup** folder is concerning what pops up when you open the extension on chrome. The box interface is what the html / css is for, and most of `popup.js` takes care of the tasks / notes. When the *New Task* button is pressed 2 html `<div>'s` are created, one that stores whatever you note in it into Chrome's local storage and another that has an **X** in it which deleted the corresponding task. For the timer a call is set when *Start Timer* is pressed that tells `backkground.js`:
-  **1:** if timer has a value or not
-  **2:** if timer `isActive` should be true or false
-  **3:** `ifActive = true` text in start button changes to **Pause Timer** and vice-versa.

Every action made is rendered once every second to make sure the timer is constantly updating and everything is upto date, hence the `taskRender()` and `taskRenderDel()` functions are called at every step required.

##### *To finish everything off, every action is saved in Chrome's storage so the data is always saved and up to date whether the browser is opened, closed or in the background.*

## *- Sarvag Kalari*


