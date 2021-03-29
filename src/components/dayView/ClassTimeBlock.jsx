import { Component } from 'react';
import BlockTimers from './BlockTimers.jsx';

class ClassTimeBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {active: false, percentageThrough: 0};

		this.changeActive = this.changeActive.bind(this);
		this.updatePercentageThrough = this.updatePercentageThrough.bind(this);
	}

	changeActive(newActive) {
		this.setState(state => ({
			active: newActive && this.props.isToday
		}));
	}

	updatePercentageThrough(percentageThrough) {
		this.setState({percentageThrough});
	}

	render() {
		return (
			<li className={"short time-line-block" + (this.props.name === "break"? " break" : " class") + (this.state.active? " active" : "")}>
				{
					this.state.percentageThrough > 0 
					&& <div className="time-line" style={{height: `${this.state.percentageThrough*100}%`}}></div>
				}
				<div className="class-description">
					{this.props.name !== "break" && (<h2 className="class-name"> {this.props.name} </h2>)}
					<BlockTimers 
						start={this.props.start} 
						finish={this.props.finish}
						int_start={this.props.int_start}
						int_finish={this.props.int_finish} 
						showStartAndFinish={this.props.name !== "break"}
						shouldUpdate={this.props.isToday}
						changeActive={this.changeActive}
						updatePercentageThrough={this.updatePercentageThrough}/>
				</div>
			</li>
		)
	}
}

export default ClassTimeBlock