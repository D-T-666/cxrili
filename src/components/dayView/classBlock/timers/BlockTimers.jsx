import { Component } from 'react';
import 'css/dayView/class-block/block-timers.scss';
import { getTimeInMinutes, getTimeInSeconds, stringifyHMS, timeLeftToHMS } from 'utils.js'


const ProgressBar = ({percentage, active, timeLeft}) => {
	const min = (a, b) => a < b ? a : b;
	return (
		<ul className="progress-bar" style={{opacity: active ? 1 : 0.2}}>
			<div className="left" style={{flexGrow: percentage}}> </div>

			<div className="right" style={{flexGrow: 1 - percentage}}>
				{timeLeft}
			</div>
		</ul>
	);
};

class BlockTimers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			left: "00:00", 
			active: false, 
			previousPercentageThrough: 0, 
			timerStage: 0
		};

		// before start : 0
		// during start : 1
		// after stated : 2
		// after ending : 3
	}

	componentDidMount() {
		this.updateTimerState();
		this.tick();
	}

	componentWillUnmount() {
		this.recycleTimer();
	}

	componentDidUpdate(prevProps) {
		if(this.props.shouldUpdate !== prevProps.shouldUpdate){
			const currentTime = getTimeInMinutes();
			this.updateTimerState(currentTime);
			this.tick();
		}
	}

	updateTimerState(currentTime) {
		if(this.props.shouldUpdate){
			const timeLeftToFinish = this.props.classData.int_end - currentTime;
			const timeLeftToStart  = this.props.classData.int_start  - currentTime;

			let timerStage = 0,
					interval = 0,
					update = true;
			
			// before start
			if(timeLeftToFinish >= 0 && timeLeftToStart >= 2 && this.state.timerStage !== 0) {
				interval = 60000;
				timerStage = 0;
			}
			// during start
			else if(timeLeftToFinish >= 0 && timeLeftToStart >= 0 && this.state.timerStage !== 1) {
				interval = 1000;
				timerStage = 1;
			}
			// after started
			else if(timeLeftToFinish >= 0 && timeLeftToStart < 0  && this.state.timerStage !== 2) {
				interval = 1000;
				timerStage = 2;
			}
			// after ending
			else if(timeLeftToFinish < 0 && timeLeftToStart < 0 && this.state.timerStage !== 3) {
				interval = 0;
				timerStage = 3;
			}
			else {
				update = false;
			}

			if(update) {
				// Clear the previous timer and state variables related to it
				this.recycleTimer();

				if(interval !== 0)
					this.timerID = setInterval(
						() => this.tick(),
						interval
					);
				
				this.setState({ timerStage });
			}
		} else {
			this.recycleTimer();
		}
	}

	recycleTimer() {
		clearInterval(this.timerID);
		this.props.updateTimeLeft(false)
		this.props.changeActive(false);
		this.setState({
			active: false, 
			previousPercentageThrough: 0, 
			timerStage: 0
		});
	}

	tick() {
		// console.log(getTimeHMS());
		if(this.props.shouldUpdate){
			let left = "0:00";
			let active = false;
			let percentage = 0;

			const currentTime = getTimeInMinutes();

			this.updateTimerState(currentTime);

			// If the current time is in the timeframe of the block
			if (currentTime >= this.props.classData.int_start) {
				percentage = (getTimeInSeconds()/60-this.props.classData.int_start)/(this.props.classData.int_end-this.props.classData.int_start);

				if(percentage >= 1)
					percentage = 1;
				if(!this.props.shouldUpdate)
					percentage = 0;

				// Time left to the end of the block
				const timeLeft = this.props.classData.int_end - currentTime;

				if (timeLeft > 0) {
					active = true;

					// Get padded string representations of the time remaining
					const { h, m, s } = stringifyHMS(timeLeftToHMS(timeLeft));

					// If there is zero hours remaining, we don't need to show it
					left = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
				
					this.props.updateTimeLeft(left);
				}else{
				}
			}

			// Update the state
			this.setState(state => {
				// Update parent state if needed
				this.props.changeActive(active);

				// Set the state to newly calculated values
				return { left, active, previousPercentageThrough: percentage, left };
			});
		}
	}

	render() {
		return (
			<div className="block-timers">
				{this.props.showStartAndFinish 
					?
						<ul>
							<li className="block-timer start"> {this.props.classData.start} </li>
							{this.props.expanded
								? 
									<ProgressBar
										percentage={this.state.previousPercentageThrough}
										active={this.state.active}
										timeLeft={this.state.left}/>
								:
									<span style={{fontWeight:900,fontFamily:"numFont",margin:"0 1ch"}}> - </span>
							}
							<li className="block-timer end"> {this.props.classData.end} </li>
						</ul>
					:
						this.state.active && 
						<ProgressBar
							percentage={this.state.previousPercentageThrough}
							active={this.state.active}
							timeLeft={this.state.left}/>
				}

			</div>
		)
	}
}

export default BlockTimers;