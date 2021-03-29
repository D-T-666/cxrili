import React, { Component } from 'react';
import WeekDayBar from "components/dayView/WeekDayBar.jsx";
import DayTable from "components/dayView/DayTable.jsx";

class DayViewPage extends Component {
	constructor(props) {
		super(props);

		const date = new Date();
		const day = date.getDay();
		const today = day < 1 || day > 5 ? false : day - 1;
		this.state = {
			colorTheme: "light-theme",
			day: parseInt(props.match.params.d) || (today || 0),
			today: today,
		};

		this.changeDay = this.changeDay.bind(this);
	}

	changeDay(day) {
		// Set state.day to the argument provided
		this.setState({day});
	}

	render() {
		return (
			<>
				<WeekDayBar
					onDayChange={this.changeDay}
					day={parseInt(this.state.day)}
				/>
				<DayTable
					today={this.state.today}
					day={this.state.day}
				/>
			</>
		);
	}
}

export default DayViewPage;