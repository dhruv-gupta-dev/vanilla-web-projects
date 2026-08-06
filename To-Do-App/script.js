// let b1 = document.getElementById("task-submit");
let form = document.getElementById("task-form");
let input = document.getElementById("task-input");
let list = document.getElementById("task-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const val = input.value.trim();
  if (val === "") {
    alert("Please Enter a Task");
    return;
  }

  addTask(val);
  input.value = "";
});

let tasks = [];

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const cb = document.createElement("input");
    cb.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(cb, span, delBtn);
    list.appendChild(li);

    cb.checked = task.completed;
    cb.addEventListener("change", () => toggleTask(task.id));
    if (task.completed) span.classList.add("completed");
  });
}

function addTask(text) {
  tasks.push({ id: Date.now(), text, completed: false });
  renderTasks();
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
}

loadTasks();
renderTasks();
