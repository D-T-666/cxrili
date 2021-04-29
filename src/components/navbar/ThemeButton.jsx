import React, { Component } from 'react';
import ls from 'local-storage'
import NavButton from 'components/navbar/NavButton';

import {DarkMode, LightMode} from 'iconComponents';

class ThemeButton extends Component {
	constructor(props) {
		super(props);

		this.state = {isToggleOn: false};

    this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const currentTheme = ls.get("colorTheme");
		this.props.onThemeSwitch(currentTheme);
		if((currentTheme === "dark-theme") !== this.state.isToggleOn)
		this.setState({
			isToggleOn: currentTheme === "dark-theme"
		})
	}

	handleClick() {
		this.setState(({isToggleOn}) => {
			const newTheme = !isToggleOn ? "dark-theme" : "light-theme";
			this.props.onThemeSwitch(newTheme);
			ls.set("colorTheme", newTheme);
			document.getElementById("theme-color").content = !isToggleOn ? "#1d1d22" : "#f3e1c8";
			return {
				isToggleOn: !isToggleOn
			}
		});
	}

	render() {
		return (
			<NavButton 
				active={false} 
				buttonClicked={this.handleClick}
				className="theme-button"
				icon={this.state.isToggleOn ? DarkMode : LightMode }
				to="#">
				{this.state.isToggleOn ? "ბნელი" : "ნათელი" }
			</NavButton>
		)
	}
}

export default ThemeButton