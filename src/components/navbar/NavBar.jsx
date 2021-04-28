import React, { Component } from 'react';
import NavButton from 'components/navbar/NavButton';
import 'css/navbar/navbar.css';
import ThemeButton from 'components/buttons/ThemeButton';

class NavBar extends Component{
	constructor (props) {
		super(props);

		this.state = {
			buttons: [false, false, false]
		};

		this.buttonClicked = this.buttonClicked.bind(this);
	}

	buttonClicked(ind) {
		this.setState(() => {
			let buttons = [];
			for(let i = 0; i < 3; i++) buttons[i] = false;
			buttons[ind] = true;

			return {buttons};
		})
	}
	
	render() {
		return (
			<ul className="nav-bar">
				<NavButton 
					active={this.state.buttons[0]} 
					buttonClicked={this.buttonClicked}
					ind={0}
					to="/day">
					დღე
				</NavButton>

				<NavButton 
					active={this.state.buttons[1]} 
					buttonClicked={this.buttonClicked}
					ind={1}
					to="/week">
					კვირა
				</NavButton>

				<NavButton 
					active={this.state.buttons[2]} 
					buttonClicked={this.buttonClicked}
					ind={2}
					to="/profile">
					პროფილი
				</NavButton>

				<ThemeButton onThemeSwitch={this.props.onThemeSwitch}></ThemeButton>
			</ul>
		);
	}
};

export default NavBar;
