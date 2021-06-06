import React from 'react';
import DayButton from "./DayButton";
import 'css/dayView/week-day-bar/week-day-bar.scss';

const WeekDayBar = ({ onDayChange, day }) => {
	const dayNames = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი"];

	return (
		<ul className="week-day-bar">
			{dayNames.map((dayName, idx) => 
				<DayButton 
					key={dayName} 
					onClick={onDayChange} 
					name={idx} 
					active={idx === day}
					className={(idx === day? "active": "")}
				>
					{dayName}
				</DayButton>
			)}
		</ul>
	);
}

export default WeekDayBar;