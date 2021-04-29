import React, { Component } from 'react';
import DayButton from "./DayButton";
import 'css/dayView/week-day-bar/week-day-bar.css';

export default ({ onDayChange, day }) => {
	const dayNames = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ"];

	return (
		<ul className="week-day-bar">
			{dayNames.map((dayName, idx) => 
				<DayButton 
					key={dayName} 
					onClick={onDayChange} 
					name={idx} 
					className={(idx === day? "active": "")}
				>
					{dayName}
				</DayButton>
			)}
		</ul>
	);
}