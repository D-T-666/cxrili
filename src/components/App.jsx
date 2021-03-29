import { Component } from "react";
import NavBar from "./NavBar.jsx";
import WeekDayBar from "./WeekDayBar.jsx";
import DayTable from "./DayTable.jsx";
import WeekTable from "./WeekTable.jsx";
import WelcomePage from 'components/WelcomePage.jsx';

import {HashRouter as Router, Switch, Route, withRouter} from 'react-router-dom';

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

	switchTheme(newTheme) {
		console.log(newTheme);
		this.setState(
			(state) => {
				document.body.classList.remove(state.colorTheme);
				document.body.classList.add(newTheme);

				return {
					colorTheme: newTheme
				};
			}
		);
	}

	changeDay(newDay) {
		this.setState({
			currentDay: newDay,
		});
	}

	componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

	onRouteChanged() {
		let day = this.props.location.pathname.split("/")[2];
		if(day){
			day = parseInt(day);
				
			if(this.state.currentDay !== day) this.changeDay(day);
		}
	}

	render() {
		return (
			<div className="App">
				

				<Switch>
					<Route path="/" exact component={WelcomePage} />
					<Route path="/day" exact component={() => (
						<>
							<WeekDayBar
								onDayChange={this.changeDay}
								currentDay={this.state.currentDay}
							/>
							<DayTable day={this.state.currentDay} today={this.state.today}/>
						</>
					)}/>
					
					<Route path="/week" component={() => <WeekTable today={this.state.today}/>} />
				</Switch>

				<NavBar onThemeSwitch={this.switchTheme}/>
			</div>
		);
	}
}

export default withRouter(App);
