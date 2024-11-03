class Task {
    constructor(message) {
        this.task = message;
        this.completed = false;
    }
    display() {
        const newTask = template.content.cloneNode(true);
        newTask.querySelector(".task").textContent = this.task;
        newTask.querySelector(".delete").addEventListener("click", () => {
            const parent  new 
           newTask.remove()
        });
        domStaks.prepend(newTask);
    }
}
const template = document.getElementById("newTask");
let tasks = [];
const input = document.getElementById("task");
const domStaks = document.getElementById("tasks");
const add = document.getElementById("add");
input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") addTask(input.value);
})
add.addEventListener("click", () => {
    addTask(input.value);
})

function addTask(message) {
    if (message == "") return;
    input.value = "";
    const task = new Task(message);
    tasks.push(task);
    task.display();

}

function clearTask() {
    tasks = [];
}