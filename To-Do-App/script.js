let b1 = document.getElementById("task-submit");
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
    const cb = document.createElement("input");
    cb.type = "checkbox";
    const li = document.createElement("li");
    li.textContent = val;
    li.appendChild(cb);
    list.appendChild(li);

    input.val = "";
}) 
