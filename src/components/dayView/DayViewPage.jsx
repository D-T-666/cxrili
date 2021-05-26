import React, { Component } from 'react';
import WeekDayBar from "components/dayView/weekDayBar/WeekDayBar";
import DayTable from "components/dayView/DayTable";
import { BrowserRouter as Router } from 'react-router-dom';
import { NotesProvider } from 'contexts/NotesContext';

class DayViewPage extends Component {
	constructor(props) {
		super(props);

		const date = new Date();
		const day = date.getDay();
		const today = day < 1 || day > 5 ? false : day - 1;
		this.state = {
			colorTheme: "light-theme",
			day: parseInt(props.match.params.d || String(today || 0)),
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
			<Router basename="/day">
				<WeekDayBar
					onDayChange={this.changeDay}
					day={parseInt(this.state.day)}
				/>
				<NotesProvider>
					<DayTable
						today={this.state.today}
						day={this.state.day}
					/>
				</NotesProvider>
			</Router>
		);
	}
}

export default DayViewPage;