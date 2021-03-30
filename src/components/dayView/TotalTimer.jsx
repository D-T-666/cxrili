import { Component } from 'react';

class TotalTimer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			left: "00:00", 
			active: false, 
			previousPercentageThrough: 0, 
			timerStage: 0
		};
  }

  componentDidMount() {
		if(this.props.shouldUpdate){
			const date = new Date();
			const currentTime = date.getHours()*60 + date.getMinutes();
			if(this.props.int_finish-currentTime >= 0) {
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

  tick() {
		const date = new Date();
		let left = "0:00";
		let active = false;
		let percentage = 0;

		const currentTime = date.getHours()*60 + date.getMinutes();

		if(this.props.int_start - currentTime < 2 && this.state.timerStage === 1) {
			clearInterval(this.timerID);
			this.timerID = setInterval(this.tick, 1000);
			this.setState({timerStage:2})
		}

		// If the current time is in the timeframe of the block
		if (currentTime >= this.props.int_start) {
			if (currentTime < this.props.int_finish) {
				active = true;

				// Time left to the end of the block
				const timeLeft = this.props.int_finish - currentTime;

				// Get padded string representations of the time remaining
				const h = String(Math.floor(timeLeft / 60)).padStart(2, "0"),
							m = String(Math.floor(timeLeft % 60 - 1)).padStart(2, "0"),
							s = String(60 - date.getSeconds()).padStart(2, "0");

				// If there is zero hours remaining, we don't need to show it
				left = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
			}else{
				clearInterval(this.timerID);
				
				this.setState({timerStage:2})
			}
		}

		// Update the state
    this.setState(state => {

			// Set the state to newly calculated values
			return { left, active, previousPercentageThrough: percentage };
		});
  }

	render() {
		return (
			<ul className="total-time-block">
				{this.state.active || (
					<li className="container"> სულ დარჩა: <span className="total-timer">{this.state.left}</span> </li>
				)}
			</ul>
		)
	}
}

export default TotalTimer;