let eltCount, timeStart;
let eltDurations = [];

function getCurrentDay() {
	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    let d = new Date();

    // day = d.getDay();
	day = 0; day++;

	return days[day];
}

(async function main(){

	// Demo ellement creation

	let day = getCurrentDay();

	let objects = await loadTimeTable(day);

	let total_duration = 0;

	for(let obj of objects){
		if (obj.name == 'break'){
			addBreakEllement(obj.duration, eltCount);
		}else{
			createClassEllement(obj.name, obj.duration, '00:00', '00:00', eltCount);
		}
		eltCount++;
		total_duration += obj.duration;
		eltDurations.push(Number(total_duration));
	}

})();