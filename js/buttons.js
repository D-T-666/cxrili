function initializeButtons() {
    const workdays = ["mon", "tue", "wed", "thu", "fri"];

    for (let i = 0; i < workdays.length; i++) {
        let day = workdays[i];

        let button = document.getElementById(day);

        button.addEventListener('click', evt => {
            if (day !== CURRENT_DAY) {
                CURRENT_DAY = day;

                updatetabelsAndButtons();
            }
        }, false);

        if (day === getCurrentDay(true)) {
            button.classList.add('button-today');
        }
    }
}

async function updatetabelsAndButtons() {
    // Update weekday buttons
    const buttons = document.getElementsByClassName('button-weekday');
    for (let btn of buttons) {
        if (btn.id !== CURRENT_DAY)
            btn.style.backgroundColor = "var(--grey-trans)";
        else
            btn.style.backgroundColor = "var(--class-color-trans)";
    }

    // Show the current day's tabel
    let exists = document.getElementById(`${CURRENT_DAY}-tabel`);
    if (exists) {
        exists.style.display = 'block';
    } else {
        await loadTimetabel(CURRENT_DAY).then(objects => buildtabel(objects));
    }

    // Hide all other tabels
    const tabels = document.getElementsByClassName('tabel-container');
    for (let tabel of tabels) {
        if (tabel.id !== `${CURRENT_DAY}-tabel`) {
            tabel.style.display = 'none';
        } else {
            tabel.style.display = 'block';
        }
    }
}