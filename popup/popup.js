// Array to hold tasks
let tasks = [];

const btnStartTimer = document.getElementById("btn-start");
btnStartTimer.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

// Get New Task button from document, when clicked call function.
const btnNewTask = document.getElementById("btn-new");
btnNewTask.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  taskRenderDel();
});

function saveTask() {
  chrome.storage.sync.set({
    tasks,
  });
}

function taskRender(taskNum) {
  const taskRow = document.createElement("div");

  // Create input element to add in divs
  const text = document.createElement("input");
  text.type = "text";
  text.value = tasks[taskNum];
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTask();
  });

  // Add a delete button to divs
  const btnDelete = document.createElement("input");
  btnDelete.type = "button";
  btnDelete.value = "X";
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
  // Splice 1 element from taskNum array
  tasks.splice(taskNum, 1);
  // Render by calling deletion render function
  taskRenderDel(taskNum);
  saveTask();
}

function taskRenderDel() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((_text, taskNum) => {
    taskRender(taskNum);
  });
}

const timeElement = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();

timeElement.textContent = `Current Time: ${currentTime}`;

chrome.action.setBadgeText(
  {
    text: "TIME",
  },
  () => {
    console.log("Badge Text Succesful");
  }
);
