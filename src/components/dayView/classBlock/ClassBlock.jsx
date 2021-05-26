import { Component } from 'react';
import BlockTimers from 'components/dayView/classBlock/timers/BlockTimers';
import ClassBlockDetails from 'components/dayView/classBlock/blockDetails/ClassBlockDetails';
import 'css/dayView/class-block/class-block.scss';

class ClassTimeBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {active: false, timeLeft: false, id: this.props.classData.id};

		this.changeActive = this.changeActive.bind(this);
		this.updateTimeLeft = this.updateTimeLeft.bind(this);
		this.expand = this.expand.bind(this);
	}

	changeActive(newActive) {
		this.setState({
			active: newActive && this.props.isToday
		});
	}

	updateTimeLeft(timeLeft) {
		this.setState({timeLeft});
	}

	getBlockClassName() {
		let classList = ["class-block"];

		classList.push(this.props.classData.name === "break" ? "break" : "class")

		if (this.state.active) classList.push("active");

		let duration = this.props.classData.int_end-this.props.classData.int_start;
		if((this.props.classData.name === "break" ? 7.5 : 32.5) < duration)
			classList.push("long")
		else
			classList.push("short")

		if(this.state.expanded) classList.push("expanded");

		return classList.join(" ")
	} 

	componentDidUpdate() {
		if(this.state.id !== this.props.classData.id)
			this.setState({
				expanded: false,
				id: this.props.classData.id
			})
	}

	expand() {
		this.setState((state) => ({
			expanded: !state.expanded,
			expanding: true
		}));
	}

	render() {
		return (
			<section className={this.getBlockClassName()} onClick={this.expand}>
				<div className="title">
					{
						this.props.classData.name !== "break" && 
						<h2 className="class-name"> {this.props.classData.name} </h2>
					}
					<BlockTimers 
						expanded={this.state.expanded}
						classData={this.props.classData}
						showStartAndFinish={this.props.classData.name !== "break"}
						shouldUpdate={this.props.isToday}
						changeActive={this.changeActive}
						updateTimeLeft={this.updateTimeLeft}/>
				</div>
				{
					this.props.classData.name !== "break" && 
					<ClassBlockDetails
						classData={this.props.classData} 
						expanded={this.state.expanded}
						timeLeft={this.state.timeLeft}/>
				}
			</section>
		)
	}
}

export default ClassTimeBlock