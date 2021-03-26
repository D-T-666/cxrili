import { Component } from 'react';
import BlockTimers from './BlockTimers.jsx';

class ClassTimeBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {active: false};
	}

	render() {
		return (
			<li className={"short time-line-block" + (this.state.active? " active" : "") + (this.props.name === "break"? " break" : " class")}>
				<div className="class-description">
					{this.props.name !== "break" && (<h2 className="class-name"> {this.props.name} </h2>)}
					<BlockTimers 
					start={this.props.start} 
					finish={this.props.finish} 
					showStartAndFinish={this.props.name !== "break"}
					active={this.state.active}/>
				</div>
			</li>
		)
	}
}

export default ClassTimeBlock