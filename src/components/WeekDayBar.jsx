import React, { Component } from 'react';
import DayButton from "./buttons/DayButton";

class WeekDayBar extends Component{
	constructor (props) {
		super(props);

		this.state = {};
	}
	
	render () {
		return (
			<div className="nav-bar">
				{[["mon", "ორშ"], ["tue", "სამ"], ["wed", "ოთხ"], ["thu", "ხუთ"], ["fri", "პარ"]].map(day => 
					<DayButton 
						key={day} 
						onClick={this.props.onDayChange} 
						name={day[0]} 
						className={(day[0] === this.props.currentDay? "active": "")}>
							{day[1]}
					</DayButton>
				)}
			</div>
		);
	}
};

export default WeekDayBar;
