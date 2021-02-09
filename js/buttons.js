function initializeButtons() {
    const workdays = ["mon", "tue", "wed", "thu", "fri"];

    for (let i = 0; i < workdays.length; i++) {
        let day = workdays[i];

        let button = document.getElementById(day);

        button.addEventListener('click', () => {
            if (day !== CURRENT_DAY) {
                let exists = document.getElementById(`${CURRENT_DAY}-table-container`);

                if (exists) {
                    exists.style.opacity = 1;
                } else {
                    CURRENT_DAY = day;
                    loadTimeTable(day).then(objects => buildTable(objects));
                }
            }
        }, false);

        if (day === getCurrentDay())
            button.style.backgroundColor = "var(--class-color-trans)";

        if (day === getCurrentDay(true))
            button.style.color = "var(--blue-color)";
    }
}