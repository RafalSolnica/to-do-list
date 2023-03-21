{
    const tasks = [
        {
            content: "Skończyć 6 moduł",
            done: false,
        },
        {
            content: "Iść na 2-godzinny spacer",
            done: false,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
				<li>
					${task.content}
				</li>
      		`;
        }

        document.querySelector('.js-tasks').innerHTML = htmlString
    };

    const init = () => {
        render()
    };

    init();
}
