import React, { Component } from 'react';
import ls from 'local-storage'

class ThemeButton extends Component {
	constructor(props) {
		super(props);

		this.state = {isToggleOn: false};

    this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const currentTheme = ls.get("colorTheme");
		this.props.onThemeSwitch(currentTheme);
		this.setState({
			isToggleOn: currentTheme === "dark-theme"
		})
	}

  handleClick() {
    this.setState(state => {
			const newTheme = !state.isToggleOn ? "dark-theme" : "light-theme"
			this.props.onThemeSwitch(newTheme);
			ls.set("colorTheme", newTheme);
			return {
				isToggleOn: !state.isToggleOn
			}
		});
  }

	render() {
		return (
			<button className="nogrow" onClick={this.handleClick}>
				{this.state.isToggleOn ? "🌙" : "🔆" }
			</button>
		)
	}
}

export default ThemeButton