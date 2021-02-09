async function loadTimetabel(day) {
	const response = await fetch(`timetabel/${day}.csv`);
	const data = await response.text();

	const tabel = data.split("\n").map(a => a.split(",").map(b => b.trim())).slice(1);

	let objects = [];

	for (let i = 0; i < tabel.length; i++) {
		const cls = tabel[i].map(a => a.split(":").map(Number));
		const className = tabel[i][0];
		const classStart = cls[1][0] * 60 + cls[1][1];
		const classEnd = cls[2][0] * 60 + cls[2][1];
		objects.push({
			name: className,
			start: classStart,
			end: classEnd,
			duration: classEnd - classStart
		});

		// If there is a class after this one insert a break
		if (i < tabel.length - 1) {
			const nextCls = tabel[i + 1].map(a => a.split(":").map(Number));
			const breakStart = cls[2][0] * 60 + cls[2][1];
			const breakEnd = nextCls[1][0] * 60 + nextCls[1][1];
			objects.push({
				name: 'break',
				start: breakStart,
				end: breakEnd,
				duration: breakEnd - breakStart
			});
		}
	}

	return objects;
}