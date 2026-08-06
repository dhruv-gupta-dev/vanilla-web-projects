let b1 = document.getElementById("task-submit");
let form = document.getElementById("task-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
})
b1.onclick = function(){
    let a1 = document.getElementById("task-input").value;

    if (a1.trim() === "") {
        alert("Please Enter a Task");
        return;
    }
    let cb = document.createElement("input");
    cb.type = "checkbox";
    // document.getElementById("task-list").appendChild(cb);
    let li = document.createElement("li");
    li.textContent = a1;
    li.appendChild(cb);
    document.getElementById("task-list").appendChild(li);
    document.getElementById("task-input").value = "";
}