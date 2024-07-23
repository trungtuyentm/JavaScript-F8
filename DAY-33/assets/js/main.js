const items = document.querySelectorAll(".list-item");
const list = document.querySelector(".list");

// Drag and drop
items.forEach(function (item) {
    item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        updateListItems(true);
    });
});

// Updates the display text of list items
function updateListItems(replace = false) {
    const subTask = Array.from(
        list.querySelectorAll(".list-item:not(.active)")
    );
    const topic = Array.from(list.querySelectorAll(".list-item.active"));
    topic.forEach(function (task, index) {
        var span = task.firstChild;
        const textNode = document.createTextNode(`Module ${index + 1}:`);
        if (replace) {
            task.replaceChild(textNode, span);
        } else {
            task.insertBefore(textNode, span);
        }
    });

    subTask.forEach(function (task, index) {
        var span = task.firstChild;
        const textNode = document.createTextNode(`Bài ${index + 1}:`);
        if (replace) {
            task.replaceChild(textNode, span);
        } else {
            task.insertBefore(textNode, span);
        }
    });
}

// Arrange and handle drag over
const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const siblings = Array.from(
        list.querySelectorAll(".list-item:not(.dragging)")
    );
    const nextTargetDrop = siblings.find(function (sibling) {
        return e.clientY <= sibling.offsetTop;
    });
    if (nextTargetDrop) {
        list.insertBefore(draggingItem, nextTargetDrop);
    } else {
        list.appendChild(draggingItem);
    }
    updateListItems(true);
};

list.addEventListener("dragover", initSortableList);
list.addEventListener("dragenter", function (e) {
    e.preventDefault();
});
updateListItems();
