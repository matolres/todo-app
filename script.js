
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskIdCounter = parseInt(localStorage.getItem("taskIdCounter")) || 1;


function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("taskIdCounter", taskIdCounter);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const numberInput = document.getElementById("numberInput");
  const taskDescription = taskInput.value;
  const taskNumber = parseFloat(numberInput.value);

  if (taskDescription.trim() !== "") {
    const task = {
      id: taskIdCounter++,
      description: taskDescription,
      number: taskNumber,
      completed: false,
    };


    tasks.push(task);

 
    const taskList = document.getElementById("taskList");
    const listItem = createTaskListItem(task);
    taskList.appendChild(listItem);

 
    taskInput.value = "";
    numberInput.value = "";

    saveTasksToLocalStorage();
  }
}


function createTaskListItem(task) {
  const listItem = document.createElement("li");


  const taskDetails = document.createElement("span");


  const checkButton = document.createElement("button");
  checkButton.innerHTML = task.completed
    ? "<i class='fa-regular fa-circle' style='color: var(--text-color);font-size:25px;'></i><i class='fa-solid fa-check uncheck' style='color: var(--text-color);'></i>"
    : "<i class='fa-regular fa-circle' style='color: var(--text-color);font-size:25px;'></i> <i class='fa-solid fa-check check' style='color: var(--text-color);'></i>";
  checkButton.addEventListener("click", () => toggleTaskCompletion(task.id));
  if (task.number) {
    taskDetails.textContent = `${task.description} - ${task.number}`;
  } else {
    taskDetails.textContent = `${task.description}`;
  }
  taskDetails.classList.add("span_style");
  listItem.appendChild(checkButton);
  listItem.appendChild(taskDetails);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='fa-regular fa-trash-can' style='color: var(--text-color);font-size:25px;'></i>";
  deleteButton.classList.add("buttons");
  deleteButton.addEventListener("click", () => deleteTask(task.id));
  listItem.appendChild(deleteButton);

  return listItem;
}


function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  displayTasks();
}


function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasksToLocalStorage();
  displayTasks();
}


function displayTasks() {
  const taskList = document.getElementById("taskList");
  const completedTaskList = document.getElementById("completedTaskList");

  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = createTaskListItem(task);
    if (task.completed) {
      completedTaskList.appendChild(listItem);
    } else {
      taskList.appendChild(listItem);
    }
  });
}


const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", addTask);


displayTasks();

const toggleButton = document.getElementById("toggle-button");
const themeName = document.querySelector(".theme_name");
toggleButton.addEventListener("click", () => {
    toggleButton.classList.toggle("active");
    document.documentElement.classList.toggle("dark_mode");
    if(document.documentElement.classList.contains("dark_mode")){
      themeName.textContent = `Dark mode`;}
      else {
        themeName.textContent = `Light mode`;
      }
    
});
