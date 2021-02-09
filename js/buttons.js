function initializeButtons() {
    const workdays = ["mon", "tue", "wed", "thu", "fri"];

    for (let i = 0; i < workdays.length; i++) {
        let day = workdays[i];

        let button = document.getElementById(day);

        button.addEventListener('click', () => {
            if (day != getCurrentDay()) {
                let root = document.getElementById("root-div");

                root.innerHTML = '';

                loadTimeTable(day).then(objects => buildTable(objects));
                updateTimers();
                CURRENT_DAY = day;
            }
        }, false);

        if (day === getCurrentDay())
            button.style.backgroundColor = "var(--class-color-trans)";

        if (day === getCurrentDay(true))
            button.style.color = "var(--blue-color)";
    }
}