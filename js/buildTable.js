function buildTable(objects) {
    eltCount = 0;
    eltDurations = [0];
    mainStart = objects[0].start;

    let tableContainer = document.createElement('div');
    tableContainer.id = `${CURRENT_DAY}-table`;
    tableContainer.style.display = 'block';
    tableContainer.classList.add('table-container');

    document.getElementById("root-div").appendChild(tableContainer);

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