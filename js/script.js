let mainStart;
let eltCount = 0;
let eltDurations = [0];

function getCurrentDay() {
	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    let d = new Date();

    day = d.getDay();

	return days[day];
}

function updateTimers(){
	let date = new Date();
	let time = date.getSeconds()+date.getMinutes()*60+date.getHours()*3600;

	for(let i = 0; i < eltDurations.length; i++){
		let left = (eltDurations[i]*60+mainStart*60) - time;
		if(left <= 0) left += (eltDurations[i+1]-eltDurations[i])*60;

		// Updating timers
		if((i+1)%2==1){
			let elt = document.getElementById(String(Math.floor(i)));
			timer = elt.childNodes[1].childNodes[1].childNodes[0].childNodes[1];
			if(left > 0){
				let s = String(left % 60).padStart(2, "0"); left = Math.floor(left/60);
				let m = String(left % 60).padStart(2, "0"); left = Math.floor(left/60);
				let h = String(left);

				timer.innerHTML = `${h}:${m}:${s}`;
			}else{
				timer.innerHTML = `0:00:00`;
			}
		}

		// Updating timelines
		if(time/60 < eltDurations[i+1] + mainStart){
			let elt = document.getElementById(String(Math.floor(i)));
			timer = elt.childNodes[0].childNodes[0];
			if(time/60 > eltDurations[i] + mainStart){
				let p = (time/60-(eltDurations[i]+mainStart))/(eltDurations[i+1]-eltDurations[i]);
				timer.style.height = `${p*100}%`;
			}else{
				timer.style.height = "0%";
			}
		}
	}
}

(async function main(){

	// Demo ellement creation

	let day = getCurrentDay();

	let objects = await loadTimeTable(day);

	mainStart = objects[0].start;

	let total_duration = 0;

	for(let obj of objects){
		if (obj.name == 'break'){
			addBreakEllement(obj.duration, eltCount);
		}else{
			start = `${String(Math.floor(obj.start/60)).padStart(2, "0")}:${String(obj.start%60).padStart(2, "0")}`
			end = `${String(Math.floor(obj.end/60)).padStart(2, "0")}:${String(obj.end%60).padStart(2, "0")}`
			createClassEllement(obj.name, obj.duration, start, end, eltCount);
		}
		eltCount++;
		total_duration += obj.duration;
		eltDurations.push(Number(total_duration));
	}

	updateTimers();
	setInterval(updateTimers, 1000);

})();