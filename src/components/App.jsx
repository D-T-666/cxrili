import { Component } from "react";
import NavBar from "components/navbar/NavBar.jsx";
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
			today: day % 6 && day - 1, // [0 1 2 3 4 5 6] -> [0 0 1 2 3 4 0]
		};
	}

	switchTheme(colorTheme) {
		// Set this.state.colorTheme to the argument provided
		// and update the classes attached to the document. 
		if(colorTheme !== this.state.colorTheme)
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

						<Route path="/profile" component={() => <h1 className="content-box" style={{color: "var(--dark)"}}>პროფილის გვერდი აქ დაგხვდება!</h1>} />
					</Switch>

					<Switch>
						<Route path="/" exact component={({match})=><NavBar match={match} onThemeSwitch={this.switchTheme.bind(this)}/>} />
						<Route path="/:page" component={({match})=><NavBar match={match} onThemeSwitch={this.switchTheme.bind(this)}/>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;