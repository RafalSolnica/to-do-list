{
  let tasks = [];
  let hideCompletedTasks = false;

  const resetTaskInput = () => {
    const newTaskInput = document.querySelector(".js-newTask");

    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskCompleted = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        completed: !tasks[taskIndex].completed,
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const markAllCompleted = () => {
    tasks.forEach((task) => (task.completed = true));

    render();
  };

  const toggleCompletedHidden = () => {
    hideCompletedTasks = !hideCompletedTasks;
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

  const bindToggleCompletedEvents = () => {
    const toggleCompletedButtons = document.querySelectorAll(
      ".js-toggleCompleted"
    );

    toggleCompletedButtons.forEach((toggleCompletedButton, index) => {
      toggleCompletedButton.addEventListener("click", () => {
        toggleTaskCompleted(index);
      });
    });
  };

  const bindToggleHiddenEvents = () => {
    const toggleCompletedHiddenButton = document.querySelector(
      ".js-toggleHideCompleted"
    );

    if (toggleCompletedHiddenButton)
      toggleCompletedHiddenButton.addEventListener(
        "click",
        toggleCompletedHidden
      );
  };

  const bindMarkAllCompletedEvents = () => {
    const markAllCompletedButton = document.querySelector(
      ".js-markAllCompleted"
    );

    if (markAllCompletedButton)
      markAllCompletedButton.addEventListener("click", markAllCompleted);
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="tasks__item ${
          task.completed && hideCompletedTasks ? "tasks__item--hidden" : ""
        }">
          <button class="tasks__itemButton tasks__itemButton--toggleCompleted js-toggleCompleted">
            ${task.completed ? "✔" : ""}
          </button>
          <span 
            class="tasks__itemContent ${
              task.completed ? "tasks__itemContent--completed" : ""
            }">
            ${task.content}
          </span>
          <button class="tasks__itemButton tasks__itemButton--remove js-remove">
            <img src="./images/trash_bin.png" alt="trash_can" class="tasks__itemIcon--remove">
          </button>
        </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const buttonContainer = document.querySelector(".js-buttonContainer");
    if (!tasks.length) {
      buttonContainer.innerHTML = "";
      return;
    }
    buttonContainer.innerHTML = `
    <button class="section__button js-toggleHideCompleted">
        ${hideCompletedTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__button js-markAllCompleted"
        ${
          tasks.every(({ completed }) => completed) ? "disabled" : ""
        }> Ukończ wszystkie 
        </button> 
    `;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleCompletedEvents();
    bindToggleHiddenEvents();
    bindMarkAllCompletedEvents();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") return;

    addNewTask(newTaskContent);

    resetTaskInput();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
