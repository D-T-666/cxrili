function buildtabel(objects) {
    eltCount = 0;
    eltDurations = [0];
    mainStart = objects[0].start;

    let tabelContainer = document.createElement('div');
    tabelContainer.id = `${CURRENT_DAY}-tabel`;
    tabelContainer.style.display = 'block';
    tabelContainer.classList.add('tabel-container');

    document.getElementById("root-div").appendChild(tabelContainer);

    let total_duration = 0;

    for (let obj of objects) {
        if (obj.name == 'break') {
            addBreakEllement(obj.duration, eltCount);
        } else {
            start = `${String(Math.floor(obj.start / 60)).padStart(2, "0")}:${String(obj.start % 60).padStart(2, "0")}`
            end = `${String(Math.floor(obj.end / 60)).padStart(2, "0")}:${String(obj.end % 60).padStart(2, "0")}`
            createClassEllement(obj.name, obj.duration, start, end, eltCount);
        }
        eltCount++;
        total_duration += obj.duration;
        eltDurations.push(Number(total_duration));
    }

    updateTimers();
}