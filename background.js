//Timer Section
// Set timer / time period
chrome.alarms.create("pTimer", {
  periodInMinutes: 1 / 60,
});

// On activation of alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pTimer") {
    chrome.storage.local.get(["timer", "isActive"], (result) => {
      if (result.isActive) {
        let timer = result.timer + 1;
        if (timer === 60 * 25) {
          // Make sure 25 minutes has passed and notify user
          this.registration.showNotification("Pomodoro Timer", {
            body: "25 Minutes Have Passed",
            icon: "iconf.png",
          });
          timer = 0;
          isActive = false;
        }
        chrome.storage.local.set({
          timer,
        });
      }
    });
  }
});

// Set timer number and state based on data in storage
chrome.storage.local.get(["timer", "isActive"], (result) => {
  chrome.storage.local.set({
    timer: "timer" in result ? result.isActive : 0,
    isActive: "isActive" in result ? result.isActive : false,
  });
});
