{
	const tasks = [
		{
			content: "Skończyć 6 moduł YouCode",
			completed: true,
		},
		{
			content: "Zrobić obiad",
			completed: false,
		},
		{
			content: "Iść na spacer",
			completed: false,
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

	const toggleTaskCompleted = (taskIndex) => {
		tasks[taskIndex].completed = !tasks[taskIndex].completed;

		render();
	};

	const bindEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});

		const toggleCompletedButtons = document.querySelectorAll(
			".js-toggleCompleted"
		);

		toggleCompletedButtons.forEach((toggleCompletedButton, index) => {
			toggleCompletedButton.addEventListener("click", () => {
				toggleTaskCompleted(index);
			});
		});
	};

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
				<li 
					class="section__task ${task.completed ? "section__task--completed" : ""}"
				>
					<button class="section__taskButton section__taskButton--toggleCompleted js-toggleCompleted">
						${task.completed ? "✔" : ""}
					</button>
					<span 
						class="section__taskContent ${
							task.completed
								? "section__taskContent--completed"
								: ""
						}">
						${task.content}
					</span>
					<button class="section__taskButton section__taskButton--remove js-remove">
						<img src="./images/trash_bin.png" alt="trash_can" class="section__removeIcon">
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
