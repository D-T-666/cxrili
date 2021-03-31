import { Component } from "react";
import NavBar from "components/NavBar.jsx";
import WeekTable from "components/weekView/WeekTable.jsx";
import WelcomePage from 'components/WelcomePage.jsx';
import DayViewPage from 'components/dayView/DayViewPage.jsx';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);

		const day = new Date().getDay();
		this.state = {
			colorTheme: "light-theme",
			today: day < 1 || day > 5 ? false : day - 1,
		};
	}

	switchTheme(colorTheme) {
		/* Set this.state.colorTheme to the argument provided
			 and udate the classes attached to the document. */
		this.setState(
			state => {
				document.body.classList.remove(state.colorTheme);
				document.body.classList.add(colorTheme);

				return {colorTheme};
			}
		);
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route path="/" exact component={WelcomePage} />

						<Route path="/day/:d" component={DayViewPage}/>
						<Route path="/day/" component={() => <Redirect to={`/day/${this.state.today}`}/>}/>
						
						<Route path="/week" component={() => <WeekTable today={this.state.today}/>} />
					</Switch>

					<NavBar onThemeSwitch={this.switchTheme.bind(this)}/>
				</div>
			</Router>
		);
	}
}

export default App;