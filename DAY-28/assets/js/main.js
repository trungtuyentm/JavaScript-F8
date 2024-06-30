var btn = document.querySelector(".btn");
var data = document.querySelector(".list-item");
var form = document.querySelector(".form");
var input = document.querySelector(".input-content");

function addTask(prevent) {
    prevent.preventDefault();
    var inputData = input.value.trim();
    if (inputData === "") {
        alert("Vui lòng nhập nội dung !");
    } else {
        data.innerHTML += `
        <li>
            <div class= 'data-items'>
                <div class='items'>
                    <span>${inputData}</span>
                    <div class='icon'>
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
                <form class="form-edits" action="">
                    <input
                        type="text"
                        placeholder="Update task"
                        class="input-content"
                    />
                    <button type="button" class="btn-edits">Add Task</button>
                    </div>
                </form>
            </div>
        </li>`;
        input.value = "";
        // input.focus();
    }

    var deletes = data.querySelectorAll("li .icon i.fa-trash");
    var edits = data.querySelectorAll("li i.fa-pen-to-square");
    var btnEdits = data.querySelectorAll("li .btn-edits");
    var inputEdits = data.querySelectorAll(".input-content");
    var spans = data.querySelectorAll(".items span");
    var items = data.querySelectorAll(".items");
    var forms = data.querySelectorAll(".form-edits");

    edits.forEach(function (value, index) {
        value.addEventListener("click", function () {
            items[index].style.visibility = "hidden";
            forms[index].style.display = "flex";
            inputEdits[index].value = spans[index].innerHTML;
        });

        btnEdits[index].addEventListener("click", function () {
            items[index].style.visibility = "visible";
            forms[index].style.display = "none";
            spans[index].innerText = inputEdits[index].value;
        });
    });
    btnEdits.forEach(function (value, index) {
        value.addEventListener("click", function () {
            value.parentElement.style.display = "none";
            value.parentElement.previousElementSibling.style.visibility =
                "visible";
        });
    });
    deletes.forEach(function (value) {
        value.addEventListener("click", function () {
            value.parentElement.parentElement.classList.add("hide");
        });
    });
    data.addEventListener("click", function (e) {
        if (e.target.tagName === "SPAN") {
            e.target.classList.toggle("completed");
        }
    });
}
form.addEventListener("submit", addTask);
