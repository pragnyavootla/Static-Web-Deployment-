const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const plantStage = document.getElementById("plantStage");
const plantIcon = document.getElementById("plantIcon");
const themeBtn = document.getElementById("themeBtn");
const progressPercent = document.getElementById("progressPercent");

addBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
);

themeBtn.addEventListener(
    "click",
    () => {
        document.body.classList.toggle("dark");

        if (
            document.body.classList.contains("dark")
        ) {
            themeBtn.textContent = "☀";
        } else {
            themeBtn.textContent = "☾";
        }
    }
);

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    if (dueDate.value) {
        li.dataset.dueDate = dueDate.value;
    }

    const taskLeft =
        document.createElement("div");

    taskLeft.classList.add(
        "task-left"
    );

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    const details =
        document.createElement("div");

    details.classList.add(
        "task-details"
    );

    const taskText =
        document.createElement("span");

    taskText.textContent = text;

    const dateInfo =
        document.createElement("small");

    if (dueDate.value) {
        dateInfo.textContent =
            "Due: " + dueDate.value;
    }

    details.appendChild(taskText);
    details.appendChild(dateInfo);

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(details);

    const deleteBtn =
        document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.classList.add(
        "delete-btn"
    );

    checkbox.addEventListener(
        "change",
        () => {
            taskText.classList.toggle(
                "completed"
            );

            updatePlant();
        }
    );

    deleteBtn.addEventListener(
        "click",
        () => {
            li.remove();
            updatePlant();
        }
    );

    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";
    dueDate.value = "";

    updatePlant();
}

function checkOverdueTasks() {

    const tasks =
        document.querySelectorAll(
            "#taskList li"
        );

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    tasks.forEach(
        (task) => {

            const due =
                task.dataset.dueDate;

            if (!due) return;

            const dueDateObj =
                new Date(due);

            if (
                dueDateObj < today
            ) {
                task.classList.add(
                    "overdue"
                );
            } else {
                task.classList.remove(
                    "overdue"
                );
            }
        }
    );
}

function updatePlant() {

    checkOverdueTasks();

    const tasks =
        document.querySelectorAll(
            "#taskList li"
        );

    const completed =
        document.querySelectorAll(
            "#taskList input[type='checkbox']:checked"
        );

    let percentage = 0;

    if (tasks.length > 0) {
        percentage = Math.round(
            (completed.length /
                tasks.length) * 100
        );
    }

    progressBar.style.width =
        percentage + "%";

    progressPercent.textContent =
        percentage + "%";

    if (percentage === 0) {

        plantIcon.textContent = "🌱";
        plantStage.textContent = "Seed";

    } else if (
        percentage < 25
    ) {

        plantIcon.textContent = "🌿";
        plantStage.textContent = "Sprout";

    } else if (
        percentage < 50
    ) {

        plantIcon.textContent = "🪴";
        plantStage.textContent = "Growing";

    } else if (
        percentage < 75
    ) {

        plantIcon.textContent = "🌳";
        plantStage.textContent = "Mature";

    } else if (
        percentage < 100
    ) {

        plantIcon.textContent = "🌲";
        plantStage.textContent =
            "Almost There";

    } else {

        plantIcon.textContent = "🌸";
        plantStage.textContent =
            "Blooming";
    }
}

updatePlant();
