function createTotalTimeLeftBlock(day) {
	document.getElementById(`${day}-table`).innerHTML +=
		'\
	<div class="total-time-block">\
		<div class="container">\
			<div class="title">\
				სულ დარჩა:\
			</div>\
			<div class="total-timer">\
				0:00:00\
			</div>\
		</div>\
	</div>';
}
