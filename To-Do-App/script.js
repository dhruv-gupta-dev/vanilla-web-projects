// let b1 = document.getElementById("task-submit");
let form = document.getElementById("task-form");
let input = document.getElementById("task-input");
let list = document.getElementById("task-list");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const val = input.value.trim();
    if(val === ""){
        alert("Please Enter a Task");
        return;
    }
    
    addTask(val);
    input.val = "";
});

let task = [];

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(task => {
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

    });
}

function addTask(text) {
    tasks.push({ id: Date.now(), text, completed: false });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

