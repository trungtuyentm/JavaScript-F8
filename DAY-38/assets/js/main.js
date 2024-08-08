import {
    addTask,
    editTask,
    deleteTask,
    markTaskAsDone,
    markTaskAsUndone,
    fetchTasks,
} from "./handleTask.js";

// DOM elements
const inputSearch = document.getElementById("input-search");
const btnAddTodos = document.querySelector(".btn-add-todos");
const btnCompleted = document.querySelector(".btn-completed");
const taskModal = document.getElementById("task-modal");
const newTaskNameInput = document.getElementById("new-task-name");
const btnOk = document.getElementById("btn-ok");
const btnCancel = document.getElementById("btn-cancel");

let editMode = false;
let editTaskId = null;

// Event listeners
btnAddTodos.addEventListener("click", () => {
    taskModal.classList.remove("hidden");
    newTaskNameInput.value = "";
    newTaskNameInput.focus();
    editMode = false;
});

btnOk.addEventListener("click", () => {
    const taskName = newTaskNameInput.value.trim();
    if (taskName) {
        if (editMode) {
            editTask(editTaskId, taskName);
        } else {
            addTask(taskName);
        }
        taskModal.classList.add("hidden");
        newTaskNameInput.value = "";
        editMode = false; // Reset edit mode
    }
});

btnCancel.addEventListener("click", () => {
    taskModal.classList.add("hidden");
    newTaskNameInput.value = "";
    editMode = false; // Reset edit mode
});

btnCompleted.addEventListener("click", () => {
    document.querySelector(".completed").classList.toggle("hidden");
    let iCompleted = document.querySelector(".btn-completed i");
    iCompleted.classList.toggle("rotate");
    btnCompleted.classList.toggle("bg");
});

inputSearch.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    filterTasks(searchQuery);
});

// Filter tasks
function filterTasks(query) {
    const tasks = Array.from(
        document.querySelectorAll(".list-task .task, .completed .task")
    );
    tasks.forEach((task) => {
        const taskName = task.querySelector("span").textContent.toLowerCase();
        task.style.display = taskName.includes(query) ? "flex" : "none";
    });
}

// Initialize
fetchTasks();

function renderTasks(tasks) {
    const listTask = document.querySelector(".list-task");
    const completed = document.querySelector(".completed");

    listTask.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `<span>${task.name}</span>
            <div class="controls">
                <button class="btn-delete" data-id="${task.id}">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class="btn-edit" data-id="${task.id}">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="btn-done" data-id="${task.id}">
                    <i class="fa-regular fa-square-check"></i>
                </button>
            </div>`;

        taskElement
            .querySelector(".btn-delete")
            .addEventListener("click", (event) => {
                const id = event.target.closest("button").dataset.id;
                deleteTask(id);
            });

        taskElement
            .querySelector(".btn-edit")
            .addEventListener("click", (event) => {
                editTaskId = event.target.closest("button").dataset.id;
                const currentName = task.name;

                newTaskNameInput.value = currentName; // Set input value to current task name
                taskModal.classList.remove("hidden");
                newTaskNameInput.focus();
                editMode = true; // Enable edit mode
            });

        taskElement
            .querySelector(".btn-done")
            .addEventListener("click", (event) => {
                const id = event.target.closest("button").dataset.id;
                const isDone = task.completed;
                if (isDone) {
                    markTaskAsUndone(id);
                } else {
                    markTaskAsDone(id);
                }
            });

        if (task.completed) {
            completed.appendChild(taskElement);
        } else {
            listTask.appendChild(taskElement);
        }
    });

    updateCompletedCount();
}
