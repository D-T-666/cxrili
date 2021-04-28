import { Component } from 'react';
import 'css/dayView/class-block/class-block-popup.css';
import BlockTimers from 'components/dayView/classBlock/timers/BlockTimers.jsx';

class ClassBlockPopup extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<>
				{
					this.props.visible && 
					<button className="class-block-popup" onClick={this.props.hide}>
						<div className="class-block-popup-content">
							<h1 className="block-popup-title"> {this.props.classData.name} </h1>
							<BlockTimers 
								classData={this.props.classData}
								showStartAndFinish={this.props.classData.name !== "break"}
								shouldUpdate={true}
								changeActive={_=>_}
								updatePercentageThrough={_=>_}/>
						</div>
					</button>
				}
			</>
		)
	}
}

export default ClassBlockPopup