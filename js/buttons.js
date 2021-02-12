function initializeButtons() {
    for (let day of workdays) {

        let button = document.getElementById(day);

        button.addEventListener('click', evt => {
            if (day !== CURRENT_DAY) {
                CURRENT_DAY = day;

                updateTabelsAndButtons();
            }
        }, false);

        if (day === getCurrentDay(true)) {
            button.classList.add('button-today');
        }
    }
	document.getElementById('menu').addEventListener('click', evt => {
		window.location.href = "/cxrili/pages/weekview/";
	})
	updateTabelsAndButtons();
}

async function updateTabelsAndButtons() {
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
        await loadTimeTabel(CURRENT_DAY).then(objects => buildTabel(objects, CURRENT_DAY));
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