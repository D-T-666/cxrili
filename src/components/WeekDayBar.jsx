import React, { Component } from 'react';
import DayButton from "./buttons/DayButton";

class WeekDayBar extends Component{
	constructor (props) {
		super(props);

		this.state = {};

		this.dayNames = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ"];
	}
	
	render () {
		return (
			<div className="nav-bar">
				{this.dayNames.map(( day, idx ) => 
					<DayButton 
						key={day} 
						onClick={this.props.onDayChange} 
						name={idx} 
						className={(idx === this.props.currentDay? "active": "")}>
							{day}
					</DayButton>
				)}
			</div>
		);
	}
};

export default WeekDayBar;
