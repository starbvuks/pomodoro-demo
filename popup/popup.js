// Array to hold tasks
let tasks = [];

// Saves any task related values
function saveTask() {
  chrome.storage.sync.set({
    tasks,
  });
}

// Get New Task button from document, when clicked call function.
const btnNewTask = document.getElementById("btn-new");
btnNewTask.addEventListener("click", () => addTask());

function taskRender(taskNum) {
  const taskRow = document.createElement("div");

  // Create input element to add in divs
  const text = document.createElement("input");
  text.type = "text";
  text.value = tasks[taskNum];
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    console.log(tasks);
    saveTask();
  });

  // Add a delete button to divs
  const btnDelete = document.createElement("input");
  btnDelete.type = "button";
  btnDelete.value = "X";
  btnDelete.className = "btn btn-outline-secondary btn-sm";
  btnDelete.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  // Add input elements to div
  taskRow.appendChild(text);
  taskRow.appendChild(btnDelete);

  // Insert divs into Main Continer Div
  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

// Create function to add tasks
function addTask() {
  // Number of task divs
  const taskNum = tasks.length;
  // Push empty string
  tasks.push("");
  saveTask();
  // Render elements by calling the taskRender function
  taskRender(taskNum);
}

// Function to delete tasks
function deleteTask(taskNum) {
  // Splice 1 element from taskNum position in array
  tasks.splice(taskNum, 1);
  // Render by calling deletion render function
  taskRenderDel(taskNum);
  saveTask();
}

// Re-Render tasks after deletion
function taskRenderDel() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((_text, taskNum) => {
    taskRender(taskNum);
  });
}

// Get tasks from storage
// ternery operator to either assign FOUND TASK or EMPTY ARRAY
chrome.storage.sync.get(["tasks"], (result) => {
  tasks = result.tasks ? result.tasks : [];
  taskRenderDel();
});

const timeElement = document.getElementById("time");
// Render time every second
function renderTime() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `Current Time: ${currentTime}`;
}
renderTime();
setInterval(renderTime, 1000);
// Set badge when activated
// chrome.action.setBadgeText({
//   text: "TIME",
// });

// Timer Secion

// Assign start button
const btnStart = document.getElementById("btn-start");

// On start button click
btnStart.addEventListener("click", () => {
  chrome.storage.local.get(["isActive"], (result) => {
    // Set result after clicking button
    chrome.storage.local.set(
      {
        isActive: !result.isActive,
      },
      () => {
        // If active/inactive change text content of button
        btnStart.textContent = result.isActive ? "Pause Timer" : "Start Timer";
      }
    );
  });
});

// Assign reset button
const btnReset = document.getElementById("btn-reset");

// On clicking reset button
btnReset.addEventListener("click", () => {
  // Set timer to 0 when clicked
  chrome.storage.local.set(
    {
      timer: 0,
      isActive: false,
    },
    () => {
      // Reset start button
      btnStart.textContent = "Start Timer";
    }
  );
});

// assign time to timer
const time = document.getElementById("timer");

// Update timer
function updateTimer() {
  //  Get timer from storage
  chrome.storage.local.get(["timer"], (result) => {
    // incriment timer in minutes, if in single digits add 0 in front
    const minutes = `${25 - Math.ceil(result.timer / 60)}`.padStart(2, "0");
    // Set seconds to 0
    let seconds = "00";
    // Set seconds value while running
    if (result.timer % 60 != 0) {
      `${(seconds = 60 - (result.timer % 60))}`.padStart(2, "0");
    }
    // Put current time value into timer
    time.textContent = `${minutes}:${seconds}`;
  });
}

setInterval(updateTimer, 1000);
