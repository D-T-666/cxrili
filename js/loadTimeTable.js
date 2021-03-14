async function loadTimeTable(day) {
	let objects = undefined;

	const class_name = window.localStorage.currentTable;

	if (class_name === undefined) {
		alert("რომელი ცხრილის ნახვა გსურს?");
		window.location = "/cxrili/pages/home/";
	}

	if (workdays.includes(day)) {
		objects = [];

		const response = await fetch(
			`/cxrili/timetable/${class_name}/${day}.csv`
		);
		const data = await response.text();

		const table = data
			.split("\n")
			.map((a) => a.split(",").map((b) => b.trim()))
			.slice(1);

		for (let i = 0; i < table.length; i++) {
			const cls = table[i].map((a) => a.split(":").map(Number));
			const className = table[i][0];
			const classStart = cls[1][0] * 3600 + cls[1][1] * 60;
			const classEnd = cls[2][0] * 3600 + cls[2][1] * 60;
			objects.push({
				name: className,
				start: classStart,
				end: classEnd,
				duration: classEnd - classStart,
			});

			// If there is a class after this one insert a break
			if (i < table.length - 1) {
				const nextCls = table[i + 1].map((a) =>
					a.split(":").map(Number)
				);
				const breakStart = classEnd;
				const breakEnd = nextCls[1][0] * 3600 + nextCls[1][1] * 60;
				objects.push({
					name: "break",
					start: breakStart,
					end: breakEnd,
					duration: breakEnd - breakStart,
				});
			}
		}
	}

	return objects;
}
