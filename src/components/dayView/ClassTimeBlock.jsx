import { Component } from 'react';
import BlockTimers from './BlockTimers.jsx';

class ClassTimeBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {active: false};

		this.changeActive = this.changeActive.bind(this);
	}

	changeActive(newActive) {
		this.setState(state => ({
			active: newActive
		}));
	}

	render() {
		return (
			<li className={"short time-line-block" + (this.props.name === "break"? " break" : " class") + (this.state.active? " active" : "")}>
				<div className="class-description">
					{this.props.name !== "break" && (<h2 className="class-name"> {this.props.name} </h2>)}
					<BlockTimers 
					start={this.props.start} 
					finish={this.props.finish}
					int_start={this.props.int_start}
					int_finish={this.props.int_finish} 
					showStartAndFinish={this.props.name !== "break"}
					changeActive={this.changeActive}/>
				</div>
			</li>
		)
	}
}

export default ClassTimeBlock