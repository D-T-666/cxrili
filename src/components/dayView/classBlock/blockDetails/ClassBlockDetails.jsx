import { Component } from 'react';
import 'css/class-block/class-block-details.css';
import NumText from 'components/small/NumText.jsx';

class ClassBlockDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.setState({
			...this.props.getData(this.props.blockIndex)
		})
	}

	componentDidUpdate() {
		const newData = this.props.getData(this.props.blockIndex);
		if(this.state.id !== newData.id)
		this.setState({
			...newData
		})
	}

	render() {
		return (
			<>
				<div
					className="details"
					style={{
						opacity: this.props.expanded ? "1" : "0",
						maxHeight: this.props.expanded ? "20rem" : "0px",
						// display: this.props.expanded ? "block" : "none"
					}}>
					<div>
						{
							this.props.timeLeft &&
							<p><span className="key o">დარჩენილი დრო</span>: <NumText>{this.props.timeLeft}</NumText></p>
						}
						<p><span className="key g">მასწავლებელი</span>: {this.state.teacher}</p>
					</div>
					<div>
						<p><span className="key b">შენიშვნა</span>: ამ ტერიტორიაზე დავამატებ საშინაო დავალებებს</p>
					</div>
				</div>
			</>
		)
	}
}

export default ClassBlockDetails