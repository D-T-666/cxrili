import { Component } from 'react';
import BlockTimers from 'components/dayView/classBlock/timers/BlockTimers';
import ClassBlockDetails from 'components/dayView/classBlock/blockDetails/ClassBlockDetails';
import 'css/class-block/class-block.css';

class ClassTimeBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {active: false, percentageThrough: 0};

		this.changeActive = this.changeActive.bind(this);
		this.updatePercentageThrough = this.updatePercentageThrough.bind(this);
		this.showClassBlockPopup = this.showClassBlockPopup.bind(this);
	}

	changeActive(newActive) {
		this.setState({
			active: newActive && this.props.isToday
		});
	}

	updatePercentageThrough(percentageThrough) {
		this.setState({percentageThrough});
	}

	getBlockClassName() {
		let classList = ["class-block"];

		if(this.props.classData.name === "break")
			classList.push("break")
		else
			classList.push("class");

		if(this.state.active)
			classList.push("active");

		let duration = this.props.classData.int_finish-this.props.classData.int_start;
		if((this.props.classData.name === "break" ? 7.5 : 32.5) < duration)
			classList.push("long")
		else
			classList.push("short")

		if(this.state.expanded)
			classList.push("expanded");

		return classList.join(" ")
	} 

	showClassBlockPopup() {
		this.setState((state) => ({
			expanded: !state.expanded
		}));
		// this.props.showPopup(this.props.blockIndex);
	}

	render() {
		return (
			<li className={this.getBlockClassName()} onClick={this.showClassBlockPopup}>
				{
					this.state.percentageThrough > 0 
					&& <div className="time-line" style={{height: `${this.state.percentageThrough*100}%`}}></div>
				}
				<div className="class-description">
					{
						this.props.classData.name !== "break" && 
						<h2 className="class-name"> {this.props.classData.name} </h2>
					}
					<BlockTimers 
						classData={this.props.classData}
						showStartAndFinish={this.props.classData.name !== "break"}
						shouldUpdate={this.props.isToday}
						changeActive={this.changeActive}
						updatePercentageThrough={this.updatePercentageThrough}/>
					{
						this.props.classData.name !== "break" && 
						<ClassBlockDetails
							getData={this.props.getClassBlockDetails} 
							blockIndex={this.props.blockIndex}
							expanded={this.state.expanded}/>
					}
				</div>
			</li>
		)
	}
}

export default ClassTimeBlock