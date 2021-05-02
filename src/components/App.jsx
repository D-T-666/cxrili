import { Component } from "react";
import NavBar from "components/navbar/NavBar.jsx";
import WeekTable from "components/weekView/WeekTable.jsx";
import WelcomePage from 'components/WelcomePage.jsx';
import DayViewPage from 'components/dayView/DayViewPage.jsx';
import SettingsPage from 'components/settings/SettingsPage';
import ls from 'local-storage'

import {AuthProvider} from 'contexts/AuthContext';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);

		const day = new Date().getDay();
		this.state = {
			colorTheme: "light",
			today: day % 6 && day - 1, // [0 1 2 3 4 5 6] -> [0 0 1 2 3 4 0]
		};
	}

	componentDidMount() {
		const currentTheme = ls.get("colorTheme");
		if(currentTheme){
			this.switchTheme(currentTheme);
		}
	}

	switchTheme(colorTheme) {
		// Set this.state.colorTheme to the argument provided
		// and update the classes attached to the document. 
		if(colorTheme !== this.state.colorTheme)
		this.setState(
			state => {
				document.getElementById("theme-color").content = state.colorTheme==="dark" ? "#f3e1c8" : "#1d1d22";

				document.body.classList.remove(state.colorTheme+"-theme");
				document.body.classList.add(colorTheme+"-theme");

				return {colorTheme};
			}
		);
	}

	render() {
		return (
			<Router>
				<AuthProvider>
					<div className="App">
						<Switch>
							<Route path="/" exact component={WelcomePage} />

							<Route path="/day/:d?" component={DayViewPage}/>
							
							<Route path="/week" component={() => <WeekTable today={this.state.today}/>} />

							<Route path="/settings" component={() => <SettingsPage switchTheme={this.switchTheme.bind(this)}/>} />
						</Switch>

						<Switch>
							<Route path="/" exact component={({match})=><NavBar match={match} onThemeSwitch={this.switchTheme.bind(this)}/>} />
							<Route path="/:page" component={({match})=><NavBar match={match} onThemeSwitch={this.switchTheme.bind(this)}/>} />
						</Switch>
					</div>
				</AuthProvider>
			</Router>
		);
	}
}

export default App;