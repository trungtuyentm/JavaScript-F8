import {
    addTask,
    editTask,
    deleteTask,
    markTaskAsDone,
    markTaskAsUndone,
    fetchTasks,
} from "./handleTask.js";

const inputSearch = document.getElementById("input-search");
const btnAddTodos = document.querySelector(".btn-add-todos");
const btnCompleted = document.querySelector(".btn-completed");
const taskModal = document.getElementById("task-modal");
const newTaskNameInput = document.getElementById("new-task-name");
const btnOk = document.getElementById("btn-ok");
const btnCancel = document.getElementById("btn-cancel");
const errorMessage = document.getElementById("error-message");

let editMode = false;
let editTaskId = null;

// Open the modal to edit the task
function openEditModal(taskId, currentName) {
    editTaskId = taskId;
    newTaskNameInput.value = currentName;
    taskModal.classList.remove("hidden");
    newTaskNameInput.focus();
    editMode = true;
}

// Event listeners
btnAddTodos.addEventListener("click", () => {
    taskModal.classList.remove("hidden");
    newTaskNameInput.value = "";
    newTaskNameInput.focus();
    editMode = false;
});

btnOk.addEventListener("click", async () => {
    const taskName = newTaskNameInput.value.trim();
    if (taskName) {
        try {
            if (editMode) {
                await editTask(editTaskId, taskName);
            } else {
                await addTask(taskName);
            }
            taskModal.classList.add("hidden");
            newTaskNameInput.value = "";
            editMode = false;
            errorMessage.classList.add("hidden");
            await fetchTasks();
        } catch (error) {
            console.error("Error handling task:", error);
        }
    } else {
        errorMessage.classList.remove("hidden");
    }
});

newTaskNameInput.addEventListener("input", () => {
    if (newTaskNameInput.value !== "") {
        errorMessage.classList.add("hidden");
    }
});

btnCancel.addEventListener("click", () => {
    taskModal.classList.add("hidden");
    newTaskNameInput.value = "";
    editMode = false;
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

// Render tasks
async function renderTasks(tasks) {
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
                <button class="btn-done ${
                    task.completed ? "completed" : ""
                }" data-id="${task.id}">
                    <i class="fa-regular fa-square-check"></i>
                </button>
            </div>`;

        // Handle task deletion event
        taskElement
            .querySelector(".btn-delete")
            .addEventListener("click", (event) => {
                const id = event.target.closest("button").dataset.id;
                deleteTask(id);
            });

        // Handle the task editing event
        taskElement
            .querySelector(".btn-edit")
            .addEventListener("click", (event) => {
                const id = event.target.closest("button").dataset.id;
                const currentName = task.name;
                openEditModal(id, currentName);
            });

        // Handle the event that marks task completion
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

    await updateCompletedCount();
}

// Update the completed count on the button
async function updateCompletedCount() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        const completedCount = tasks.filter((task) => task.completed).length;

        const btnCompleted = document.querySelector(".btn-completed");
        btnCompleted.innerHTML = `Completed Todos ${completedCount} <i class="fa-regular fa-circle-down"></i>`;
    } catch (error) {
        console.error("Error updating completed count:", error);
    }
}

fetchTasks();
