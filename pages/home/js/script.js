const workdays = ["mon", "tue", "wed", "thu", "fri"];
const georgian_days = {
	mon: "ორშაბათი",
	tue: "სამშაბათი",
	wed: "ოთხშაბათი",
	thu: "ხუთშაბათი",
	fri: "პარასკევი",
	times: "დროები",
};

async function loadTimeTables() {
	return await fetch("/cxrili/timetable/tables.json")
		.then((res) => res.json())
		.then((data) => data);
}

async function createTableElement(table, saved) {
	const tableElement = document.createElement("div");
	tableElement.classList.add("table");
	tableElement.id = `${table.name}-table`;

	let parent;
	if (saved) {
		parent = document.getElementById("added-tables");
	} else {
		parent = document.getElementById("available-tables");
	}
	parent.appendChild(tableElement);
	parent.classList.remove("hidden");

	const tableDescription = document.createElement("div");
	tableDescription.classList.add("description");

	tableElement.appendChild(tableDescription);

	const tableName = document.createElement("div");
	tableName.classList.add("name");
	tableName.innerHTML = table.name;

	tableDescription.appendChild(tableName);

	const tableTeacher = document.createElement("div");
	tableTeacher.classList.add("teacher");
	tableTeacher.innerHTML = table.teacher;

	tableDescription.appendChild(tableTeacher);

	const button = document.createElement("div");
	button.classList.add("button");
	button.classList.add(saved ? "open" : "download");
	button.innerHTML = saved ? "გახსნა" : "შენახვა";
	button.addEventListener(
		"click",
		(evt) => {
			if (saved) {
				window.localStorage.currentTable = table.name;
				window.location = "/cxrili/";
			} else {
				fetch(`/cxrili/timetable/${table.name}/mon.csv`).then((a) => {
					evt.target.parentElement.parentElement.removeChild(
						evt.target.parentElement
					);
					document
						.getElementById("added-tables")
						.appendChild(evt.target.parentElement);

					document
						.getElementById("added-tables")
						.classList.remove("hidden");
					evt.target.innerHTML = "გახსნა";
					evt.target.classList.add("open");
					evt.target.classList.remove("download");
					saved = true;
				});
			}
		},
		false
	);

	tableElement.appendChild(button);

	return tableElement;
}

async function buildEllements() {
	const tables = await loadTimeTables();

	for (let table of tables.tables) {
		const tableElement = await createTableElement(
			table,
			tables.savedTables.includes(table.name)
		);
	}
}

function initializeButtons() {
	// document.getElementById("menu").addEventListener(
	// 	"click",
	// 	(evt) => {
	// 		window.location.href = "/cxrili/";
	// 	},
	// 	false
	// );

	initializeInfoButton();
}

async function main() {
	await buildEllements();

	initializeButtons();
}
