import 'css/dayView/class-block/class-block-details.scss';
import Notes from 'components/dayView/classBlock/blockDetails/notes';

import { Profile, Time } from 'iconComponents';

const ClassBlockDetails = (props) => (
	<>
		{
			props.timeLeft &&
			<div
				className="details"
				style={{
					opacity: props.expanded ? "1" : "0",
					maxHeight: props.expanded ? "100rem" : "0px"
				}}>
				{
					props.timeLeft &&
					<div className="key o">
						<Time />
						<p>
							<span style={{fontFamily: "numFont"}}>{props.timeLeft}</span>
						</p>
					</div>
				}
				{/* <div className="key g">
					<Profile />
					<p>
						{props.classData.teacher}
					</p>
				</div> */}
			</div>
		}
		<Notes blockData={props.classData} visible={props.expanded} />
	</>
);

export default ClassBlockDetails