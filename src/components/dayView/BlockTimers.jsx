import { Component } from 'react';

class BlockTimers extends Component {
	constructor(props) {
		super(props);

		this.state = {left: "00:00"};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
		const date = new Date();
		let left = "0:00";

		const h = date.getHours(), 
					m = date.getMinutes(), 
					s = date.getSeconds();

		const ph = parseInt(this.props.start.split(":")[0]),
					pm = parseInt(this.props.start.split(":")[1]);

		if (ph < h && pm < m) {

			left = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
		}

    this.setState({
      left: left
    });
  }

	render() {
		return (
			<ul className="block-timers">
				{this.props.showStartAndFinish && <li className="block-timer start"> {this.props.start} </li>}
				{this.props.active && <li className="block-timer left"> {this.state.left} </li>}
				{this.props.showStartAndFinish && <li className="block-timer finish"> {this.props.finish} </li>}
			</ul>
		)
	}
}

export default BlockTimers;