import React, { Component } from 'react';
import DayButton from "./DayButton";
import 'css/dayView/week-day-bar/week-day-bar.css';

class WeekDayBar extends Component{
	constructor (props) {
		super(props);

		this.state = {};

		this.dayNames = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ"];
	}
	
	render () {
		return (
			<ul className="week-day-bar">
				{this.dayNames.map(( day, idx ) => 
					<DayButton 
						key={day} 
						onClick={this.props.onDayChange} 
						name={idx} 
						className={(idx === this.props.day? "active": "")}>
							{day}
					</DayButton>
				)}
			</ul>
		);
	}
};

export default WeekDayBar;
