import { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import WeekDayBar from "./components/WeekDayBar.jsx";
import TimeTable from "./components/dayView/TimeTable.jsx";
import "./main.css";
import "./style.css";
import "./root.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { colorTheme: "light-theme", currentDay: "mon" };

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
		console.log(newDay);
		this.setState((state) => ({
			currentDay: newDay,
		}));
	}

	render() {
		return (
			<div className="App">
				<WeekDayBar
					onDayChange={this.changeDay}
					currentDay={this.state.currentDay}
				/>
				{[
					["mon", "ორშ"],
					["tue", "სამ"],
					["wed", "ოთხ"],
					["thu", "ხუთ"],
					["fri", "პარ"],
				].map((day) => (
					<TimeTable
						day={day[0]}
						key={day[0] + day[1]}
						currentDay={this.state.currentDay}
					/>
				))}
				<NavBar onThemeSwitch={this.switchTheme} />
			</div>
		);
	}
}

export default App;
