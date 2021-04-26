import { Component } from 'react';

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
				<p>მასწავლებელი: {this.state.teacher}</p>
			</>
		)
	}
}

export default ClassBlockDetails