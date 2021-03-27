import { Component } from "react";
import NavBar from "./NavBar.jsx";
import WeekDayBar from "./WeekDayBar.jsx";
import TimeTable from "./TimeTable.jsx";

class App extends Component {
	constructor(props) {
		super(props);

		const date = new Date();
		const day = date.getDay();
		this.state = {
			colorTheme: "light-theme",
			currentDay: day < 1 || day > 5 ? 0 : day - 1,
			today: day < 1 || day > 5 ? false : day - 1,
		};

		this.switchTheme = this.switchTheme.bind(this);
		this.changeDay = this.changeDay.bind(this);
	}

	switchTheme() {
		this.setState(
			(state) => ({
				colorTheme:
					state.colorTheme === "dark-theme"
						? "light-theme"
						: "dark-theme",
			}),
			() => {
				if (this.state.colorTheme === "dark-theme")
					document.body.classList.add("dark-theme");
				else document.body.classList.remove("dark-theme");
			}
		);
	}

	changeDay(newDay) {
		this.setState({
			currentDay: newDay,
		});
	}

	render() {
		return (
			<div className="App">
				<WeekDayBar
					onDayChange={this.changeDay}
					currentDay={this.state.currentDay}
				/>
				<TimeTable
					day={this.state.currentDay}
					today={this.state.today}
				/>
				<NavBar onThemeSwitch={this.switchTheme} />
			</div>
		);
	}
}

export default App;
