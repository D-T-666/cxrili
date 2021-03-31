import { Component } from 'react';
import 'functions.js';
import { getTimeInMinutes, getTimeInSeconds, stringifyHMS, timeLeftToHMS } from 'functions.js';

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
		this.initializeTimer();
		this.tick();
	}

	componentWillUnmount() {
		this.recycleTimer();
	}

	componentDidUpdate(prevProps) {
		if(this.props.shouldUpdate !== prevProps.shouldUpdate){
			this.initializeTimer();
			this.tick();
		}
	}

	initializeTimer() {
		if(this.props.shouldUpdate){
			const currentTime = getTimeInMinutes();
			const timeLeftToFinish = this.props.int_finish - currentTime;
			const timeLeftToStart = this.props.int_start - currentTime;
			let timerStage = 0;

			
			// before start
			if(timeLeftToFinish >= 0 && timeLeftToStart >= 2 && this.state.timerStage !== 0) {
				this.recycleTimer();
				this.timerID = setInterval(
					() => this.tick(),
					60000
				);
				timerStage = 0;
			}
			// during start
			if(timeLeftToFinish >= 0 && timeLeftToStart < 2 && this.state.timerStage !== 1) {
				this.recycleTimer();
				this.timerID = setInterval(
					() => this.tick(),
					1000
				);
				timerStage = 1;
			}
			// after started
			if(timeLeftToFinish >= 0 && timeLeftToFinish < 0  && this.state.timerStage !== 2) {
				this.recycleTimer();
				this.timerID = setInterval(
					() => this.tick(),
					1000
				);
				timerStage = 2;
			}
			// after ending
			if(timeLeftToFinish >= 0 && timeLeftToFinish < 0 && this.state.timerStage !== 3) {
				this.recycleTimer();
				this.timerID = setInterval(
					() => this.tick(),
					1000
				);
				timerStage = 2;
			}

			this.setState({ timerStage });
		}
	}

	recycleTimer() {
		clearInterval(this.timerID);
		this.props.updatePercentageThrough(0);
		this.props.changeActive(false);
		this.setState({active: false, previousPercentageThrough: 0});
	}

	tick() {
		if(this.props.shouldUpdate){
			let left = "0:00";
			let active = false;
			let percentage = 0;

			const currentTime = getTimeInMinutes();

			this.initializeTimer();

			// If the current time is in the timeframe of the block
			if (currentTime >= this.props.int_start) {
				percentage = (getTimeInSeconds()/60-this.props.int_start)/(this.props.int_finish-this.props.int_start);

				if(percentage >= 1)
					percentage = 1;
				if(!this.props.shouldUpdate)
					percentage = 0;

				// Time left to the end of the block
				const timeLeft = this.props.int_finish - currentTime;

				if (timeLeft > 0) {
					active = true;

					// Get padded string representations of the time remaining
					const { h, m, s } = stringifyHMS(timeLeftToHMS(timeLeft));

					// If there is zero hours remaining, we don't need to show it
					left = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
				
					this.props.updatePercentageThrough(percentage);
				}else{
					if(percentage !== this.state.previousPercentageThrough && percentage > 0)
						this.props.updatePercentageThrough(1);
					if(percentage == 0)
						this.props.updatePercentageThrough(0);
				}
			}

			// Update the state
			this.setState(state => {
				// Update parent state if needed
				this.props.changeActive(active);

				// Set the state to newly calculated values
				return { left, active, previousPercentageThrough: percentage };
			});
		}
	}

	render() {
		return (
			<ul className="block-timers">
				{this.props.showStartAndFinish && <li className="block-timer start"> {this.props.start} </li>}
				{this.state.active && <li className="block-timer left"> {this.state.left} </li>}
				{this.props.showStartAndFinish && <li className="block-timer finish"> {this.props.finish} </li>}
			</ul>
		)
	}
}

export default BlockTimers;