import { Component } from 'react';
import 'css/dayView/class-block/total-timer.scss';
import { getTimeInMinutes, stringifyHMS, timeLeftToHMS } from 'utils.js';

class TotalTimer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			left: "00:00", 
			active: false, 
			timerStage: 0,
			int_end: this.props.int_end,
			int_start: this.props.int_start
		};
  }

  componentDidMount() {
		if(this.props.shouldUpdate){
			const currentTime = getTimeInMinutes();
			if(this.state.int_end-currentTime >= 0) {
				this.timerID = setInterval(
					() => this.tick(),
					(this.props.int_start - currentTime < 2) ? 1000 : 60000
				)

				this.tick();

				this.setState({timerStage:(this.props.int_start - currentTime < 2) ? 2 : 1})
			}else{
				this.tick();
			}
		}
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	componentDidUpdate(prevProps) {
		if(this.props.shouldUpdate !== prevProps.shouldUpdate)
			this.tick();
	}

  tick() {
		let left = "0:00";
		let active = false;

		const currentTime = getTimeInMinutes();

		if(this.props.int_start - currentTime < 2 && this.state.timerStage === 1) {
			clearInterval(this.timerID);
			this.timerID = setInterval(this.tick, 1000);
			this.setState({timerStage:2})
		}

		// If the current time is in the timeframe of the block
		if (currentTime >= this.props.int_start) {
			if (currentTime < this.props.int_end) {
				active = true;

				// Time left to the end of the block
				const timeLeft = this.props.int_end - currentTime;

				// Get padded string representations of the time remaining
				const { h, m, s } = stringifyHMS(timeLeftToHMS(timeLeft));

				// If there is zero hours remaining, we don't need to show it
				left = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
			
			}else{
				clearInterval(this.timerID);
				
				this.setState({timerStage:3})
			}
		}

		// Update the state
    this.setState({ left, active });
  }

	render() {
		return (
			<>
				{
					this.state.active
					&&
					<ul className="total-time-block">
						<li className="container"> სულ დარჩა: <span className="total-timer">{this.state.left}</span> </li>
					</ul>
				}
			</>
		)
	}
}

export default TotalTimer;