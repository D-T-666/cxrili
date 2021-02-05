async function loadTimeTable(day) {
    let response = await fetch(`timetable/${day}.csv`);
    let data = await response.text();
	let table = data.split("\n").map(a => a.split(",").map(b => b.trim()));
	table = table.slice(1);
	
	let objects = [];

	for (let i = 0; i < table.length; i++) {
		let row = table[i];
		objects.push({
			name: row[0],
			start: Number(row[1].split(":")[0])*60+Number(row[1].split(":")[1]),
			end: Number(row[2].split(":")[0])*60+Number(row[2].split(":")[1]),
			duration: Number(row[2].split(":")[0])*60+Number(row[2].split(":")[1])-(Number(row[1].split(":")[0])*60+Number(row[1].split(":")[1]))
		});
		if(i < table.length-1){
			let next_row = table[i+1];
			objects.push({
				name: 'break',
				start: Number(row[2].split(":")[0])*60+Number(row[2].split(":")[1]),
				end: Number(next_row[1].split(":")[0])*60+Number(next_row[1].split(":")[1]),
				duration: Number(next_row[1].split(":")[0])*60+Number(next_row[1].split(":")[1])-(Number(row[2].split(":")[0])*60+Number(row[2].split(":")[1]))
			});
		}
	}

	return objects;
}