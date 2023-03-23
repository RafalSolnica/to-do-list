{
	const tasks = [
		{
			content: "Skończyć 6 moduł YouCode",
			done: true,
		},
		{
			content: "Zrobić obiad",
			done: false,
		},
		{
			content: "Iść na spacer",
			done: false,
		},
	];

	const resetTaskInput = () => {
		const newTaskInput = document.querySelector(".js-newTask");

		newTaskInput.value = "";
		newTaskInput.focus();
	};

	const addNewTask = (newTaskContent) => {
		tasks.push({
			content: newTaskContent,
		});

		render();
	};

	const removeTask = (taskIndex) => {
		tasks.splice(taskIndex, 1);

		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks[taskIndex].done = !tasks[taskIndex].done;

		render();
	};

	const bindEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});

		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	};

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
				<li 
                    class="section__listItem ${
						task.done ? "section__listItem--done" : ""
					}"
                >
					<button class="section__iconButton js-done">
                        <img src="./images/checkbox.svg" alt="check_mark" class="section__completionIcon">
                    </button>
                    <span class="section__listItemContent">
                        ${task.content}
                    </span>
                    <button class="section__iconButton js-remove">
                        <img src="./images/trash-can.svg" alt="trash_can" class="section__removeIcon">
                    </button>
				</li>
			`;
		}

		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindEvents();
	};

	const onFormSubmit = (e) => {
		e.preventDefault();

		const newTaskContent = document
			.querySelector(".js-newTask")
			.value.trim();

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
