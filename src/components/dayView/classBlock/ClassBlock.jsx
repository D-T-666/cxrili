import { Component } from 'react';
import BlockTimers from 'components/dayView/classBlock/timers/BlockTimers';
import ClassBlockDetails from 'components/dayView/classBlock/blockDetails/ClassBlockDetails';

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
		return "time-line-block" + 
			(this.props.classData.name === "break"? " break" : " class") + 
			(this.state.active ? " active" : "") + 
			(this.props.int_finish-this.props.int_start > (this.props.classData.name === "break"? 7.5 : 32.5) ? " long" : " short");
	} 

	showClassBlockPopup() {
		this.props.showPopup(this.props.blockIndex);
	}

	render() {
		return (
			<li className="time-line-block-container">
				<button className={this.getBlockClassName()} onClick={this.showClassBlockPopup}>
					{
						this.state.percentageThrough > 0 
						&& <div className="time-line" style={{height: `${this.state.percentageThrough*100}%`}}></div>
					}
					<div className="class-description">
						{this.props.classData.name !== "break" && (<h2 className="class-name"> {this.props.classData.name} </h2>)}
						<BlockTimers 
							classData={this.props.classData}
							showStartAndFinish={this.props.classData.name !== "break"}
							shouldUpdate={this.props.isToday}
							changeActive={this.changeActive}
							updatePercentageThrough={this.updatePercentageThrough}/>
						{
							false && 
							<ClassBlockDetails
								getData={this.props.getClassBlockDetails} 
								blockIndex={this.props.blockIndex}/>
						}
					</div>
				</button>
			</li>
		)
	}
}

export default ClassTimeBlock