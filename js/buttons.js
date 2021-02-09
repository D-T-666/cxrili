function initializeButtons() {
    const workdays = ["mon", "tue", "wed", "thu", "fri"];

    for (let i = 0; i < workdays.length; i++) {
        let day = workdays[i];

        let button = document.getElementById(day);

        button.addEventListener('click', evt => {
            if (day !== CURRENT_DAY) {
                CURRENT_DAY = day;

                updateTablesAndButtons();
            }
        }, false);

        if (day === getCurrentDay(true)) {
            button.classList.add('button-today');
        }
    }
}

async function updateTablesAndButtons() {
    // Update weekday buttons
    const buttons = document.getElementsByClassName('button-weekday');
    for (let btn of buttons) {
        if (btn.id !== CURRENT_DAY)
            btn.style.backgroundColor = "var(--grey-trans)";
        else
            btn.style.backgroundColor = "var(--class-color-trans)";
    }

    // Show the current day's table
    let exists = document.getElementById(`${CURRENT_DAY}-table`);
    if (exists) {
        exists.style.display = 'block';
    } else {
        await loadTimeTable(CURRENT_DAY).then(objects => buildTable(objects));
    }

    // Hide all other tables
    const tables = document.getElementsByClassName('table-container');
    for (let table of tables) {
        if (table.id !== `${CURRENT_DAY}-table`) {
            table.style.display = 'none';
        } else {
            table.style.display = 'block';
        }
    }
}