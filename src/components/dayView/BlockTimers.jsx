import { Component } from 'react';

class BlockTimers extends Component {
	constructor(props) {
		super(props);

		this.state = {left: "00:00", active: false, previousPercentageThrough: 0};
  }

  componentDidMount() {
		if(this.props.shouldUpdate){
			this.tick();
			this.timerID = setInterval(
				() => this.tick(),
				1000
			);
		}
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
		const date = new Date();
		let left = "0:00";
		let active = false;
		let percentage = 0;

		const currentTime = date.getHours()*60 + date.getMinutes();

		// If the current time is in the timeframe of the block
		if (currentTime > this.props.int_start) {
			percentage = (currentTime-this.props.int_start +  date.getSeconds()/60)/(this.props.int_finish-this.props.int_start);
			if(percentage >= 1)
				percentage = 1;


			if (currentTime <= this.props.int_finish) {
				active = true;

				// Time left to the end of the block
				const timeLeft = this.props.int_finish - currentTime;

				// Get padded string representations of the time remaining
				const h = String(Math.floor(timeLeft / 60)).padStart(2, "0"),
							m = String(Math.floor(timeLeft % 60)).padStart(2, "0"),
							s = String(60 - date.getSeconds()).padStart(2, "0");

				// If there is zero hours remaining, we don't need to show it
				left = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
			
				this.props.updatePercentageThrough(percentage);
			}else{
				if(percentage !== this.state.previousPercentageThrough)
					this.props.updatePercentageThrough(1);
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