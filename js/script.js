{
    let tasks = [];
    let doneTasksHide = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                content: tasks[taskIndex].content,
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    const hideTaskDone = () => {
        doneTasksHide = !(doneTasksHide);
        render();
    };

    const allTaskDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        if (tasks.length > 0) {
            const hideDoneButton = document.querySelector(".js-hideDone");

            hideDoneButton.addEventListener("click", () => {
                hideTaskDone();
            });

            const allDoneButton = document.querySelector(".js-allDone");

            allDoneButton.addEventListener("click", () => {
                allTaskDone();
            });
        }
    };

    const isEveryTaskDone = (tasks) => {
        return tasks.every(({ done }) => done);
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item${(doneTasksHide && task.done) ? " list__items--hide" : ""}">
                 <button class="js-done list__button list__button--toggle">
                        ${task.done ? "&#10004;" : ""}
                </button>
                <span class="list__task${task.done ? " list__task--done" : ""}">
                     ${task.content}
                </span>
                <button class="js-remove list__button list__button--remove">
                    &#128465;
                </button> 
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        if (tasks.length > 0) {
            let htmlString = `
                <button class="js-hideDone section__button">${doneTasksHide ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
                <button class="js-allDone section__button" ${isEveryTaskDone(tasks) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
            document.querySelector(".js-menuButtons").innerHTML = htmlString;
        } else {
            htmlString = "";
            document.querySelector(".js-menuButtons").innerHTML = htmlString;
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}