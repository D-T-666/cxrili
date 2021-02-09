
function updateTimers() {
    let date = new Date();
    let time = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;

    for (let i = 0; i < eltDurations.length - 1; i++) {
        let elts = document.getElementsByClassName(`${i}`);

        for (let elt of elts) {
            let left = (eltDurations[i] * 60 + mainStart * 60) - time;

            // Coloring the timer background and timer remaining based on time left
            if (left <= 0) {
                left += (eltDurations[i + 1] - eltDurations[i]) * 60;
                if (!elt.classList.contains("break"))
                    elt.childNodes[1].childNodes[1].childNodes[0].style.backgroundColor = 'var(--end-color)';
            } else {
                if (!elt.classList.contains("break"))
                    elt.childNodes[1].childNodes[1].childNodes[0].style.backgroundColor = 'var(--start-color)';
            }

            // Updating timers
            if ((i) % 2 == 0) {
                timer = elt.childNodes[1].childNodes[1].childNodes[0].childNodes[1];
                if (left > 0) {
                    let s = String(left % 60).padStart(2, "0"); left = Math.floor(left / 60);
                    let m = String(left % 60).padStart(2, "0"); left = Math.floor(left / 60);
                    let h = String(left);

                    timer.innerHTML = `${h}:${m}:${s}`;
                } else {
                    timer.innerHTML = `0:00:00`;
                }
            }

            // Updating timelines and block backgrounds
            timer = elt.childNodes[0].childNodes[0];
            if (time / 60 < eltDurations[i + 1] + mainStart) {
                if (time / 60 > eltDurations[i] + mainStart) {
                    let p = (time / 60 - (eltDurations[i] + mainStart)) / (eltDurations[i + 1] - eltDurations[i]);
                    timer.style.height = `${p * 100}%`;
                    elt.style.color = "var(--class-color-bright)";

                    if (!elt.classList.contains("break")) {
                        elt.style.backgroundImage = "repeating-linear-gradient(30deg, var(--class-color-trans), var(--class-color-trans) 0.4rem, #0006 0.4rem, #0006 1rem)";
                    } else {
                        elt.style.backgroundImage = "repeating-linear-gradient(-25deg, var(--break-color), var(--break-color) 0.4rem, var(--break-color-dark) 0, var(--break-color-dark) 0.8rem)";
                    }
                } else {
                    timer.style.height = "0%";
                }
            } else {
                if (elt.classList.contains("break")) {
                    elt.style.backgroundColor = "var(--break-color-trans)";
                } else {
                    elt.style.backgroundColor = "#0006";
                }
                elt.style.backgroundImage = "";
                timer.style.height = "100%";
                elt.style.color = "var(--class-color)";
            }
        }
    }

    if ((eltDurations[eltDurations.length - 1] * 60 + mainStart * 60) - time < -5 * 60 && !switchedToNextDay) {
        let d = new Date();

        CURRENT_DAY = DAYS[d.getDay() + 1];
        updatetabelsAndButtons();

        switchedToNextDay = true;
    }
}