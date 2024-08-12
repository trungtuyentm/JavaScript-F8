const apiUrl = "https://l9r3pr-8080.csb.app/users";

// Add a new task
export async function addTask(taskName) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: taskName, completed: false }),
        });
        if (response.ok) {
            fetchTasks();
        } else {
            console.error("Error adding task:", await response.text());
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

function openEditModal(taskId, currentName) {
    const taskModal = document.getElementById("task-modal");
    const newTaskNameInput = document.getElementById("new-task-name");
    const btnOk = document.getElementById("btn-ok");
    const errorMessage = document.getElementById("error-message");

    newTaskNameInput.value = currentName;
    taskModal.classList.remove("hidden");
    newTaskNameInput.focus();

    errorMessage.classList.add("hidden");

    btnOk.onclick = function () {
        const taskName = newTaskNameInput.value.trim();
        if (taskName) {
            editTask(taskId, taskName)
                .then(() => {
                    taskModal.classList.add("hidden");
                    newTaskNameInput.value = "";
                })
                .catch((error) => {
                    console.error("Error editing task:", error);
                });
        } else {
            errorMessage.classList.remove("hidden");
        }
    };
}

// Edit an existing task
export async function editTask(id, newName) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName }),
        });
        if (response.ok) {
            await fetchTasks();
        } else {
            console.error("Error editing task:", await response.text());
        }
    } catch (error) {
        console.error("Error editing task:", error);
    }
}

// Delete a task
export async function deleteTask(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            fetchTasks();
        } else {
            console.error("Error deleting task:", await response.text());
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Mark a task as done
export async function markTaskAsDone(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: true }),
        });
        if (response.ok) {
            fetchTasks();
        } else {
            console.error("Error marking task as done:", await response.text());
        }
    } catch (error) {
        console.error("Error marking task as done:", error);
    }
}

// Mark a task as undone
export async function markTaskAsUndone(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: false }),
        });
        if (response.ok) {
            fetchTasks();
        } else {
            console.error(
                "Error marking task as undone:",
                await response.text()
            );
        }
    } catch (error) {
        console.error("Error marking task as undone:", error);
    }
}

// Fetch tasks from API and render
async function fetchTasks() {
    try {
        const response = await fetch(`${apiUrl}?t=${new Date().getTime()}`);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Render tasks
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
                <button class="btn-done ${
                    task.completed ? "completed" : ""
                }" data-id="${task.id}">
                    <i class="fa-regular fa-square-check"></i>
                </button>
            </div>`;

        taskElement
            .querySelector(".btn-delete")
            .addEventListener("click", (event) => {
                const id = event.target.closest("button").dataset.id;
                deleteTask(id);
            });

        // Handle task repair event
        taskElement
            .querySelector(".btn-edit")
            .addEventListener("click", (event) => {
                const id = event.target.closest("button").dataset.id;
                openEditModal(id, task.name);
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

export { fetchTasks, renderTasks };
