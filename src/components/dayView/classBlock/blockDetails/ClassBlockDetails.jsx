import { Component } from 'react';
import 'css/class-block/class-block-details.css';

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

	render() {
		return (
			<>
			{
				this.props.expanded && 
				<div
					className="details"
					style={{
						opacity: "1"
					}}>
					<p><span className="key g">მასწავლებელი</span>: {this.state.teacher}</p>
					<p><span className="key o">ისევ მასწავლებელი</span>: {this.state.teacher}</p>
					<p><span className="key b">შენიშვნა</span>: ამ ტერიტორიაზე დავამატებ საშინაო დავალებებს</p>
				</div>
			}
			</>
		)
	}
}

export default ClassBlockDetails