import React, { Component } from 'react';

class ThemeButton extends Component {
	constructor(props) {
		super(props);

		this.state = {isToggleOn: false};

    this.handleClick = this.handleClick.bind(this);
	}

  handleClick() {
		this.props.onThemeSwitch();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
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