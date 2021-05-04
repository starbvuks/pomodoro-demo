// chrome.alarms.create("Timer", {
//   periodInMinutes: 1 / 60,
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "Timer") {
//     chrome.storage.local.get(["timer", "isRunning"], (result) => {
//       if (result.isRunning) {
//         let timer = res.timer + 1;
//         chrome.storage.local.set({
//           timer,
//         });
//       }
//     });
//   }
// });

// chrome.storage.local.get(["timer", "isRunning"], (result) => {
//   chrome.storage.local.set({
//     timer: "timer" in result ? res.timer : 0,
//     isRunning: "isRunning" in res ? res.isRunning : false,
//   });
// });
