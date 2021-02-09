async function loadTimeTable(day) {
	let response = await fetch(`timetable/${day}.csv`);
	let data = await response.text();

	let table = data.split("\n").map(a => a.split(",").map(b => b.trim())).slice(1);

	let objects = [];

	for (let i = 0; i < table.length; i++) {
		let row = table[i].map(a => a.split(":").map(Number));
		objects.push({
			name: table[i][0],
			start: row[1][0] * 60 + row[1][1],
			end: row[2][0] * 60 + row[2][1],
			duration: row[2][0] * 60 + row[2][1] - row[1][0] * 60 - row[1][1]
		});
		if (i < table.length - 1) {
			let next_row = table[i + 1].map(a => a.split(":").map(Number));
			objects.push({
				name: 'break',
				start: row[2][0] * 60 + row[2][1],
				end: next_row[1][0] * 60 + next_row[1][1],
				duration: next_row[1][0] * 60 + next_row[1][1] - row[2][0] * 60 - row[2][1]
			});
		}
	}

	return objects;
}