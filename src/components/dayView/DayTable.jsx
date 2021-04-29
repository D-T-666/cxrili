import React, { Component } from 'react';
import ClassBlock from "components/dayView/classBlock/ClassBlock.jsx";
import TotalTimer from 'components/dayView/classBlock/timers/TotalTimer.jsx';
import ClassBlockPopup from 'components/dayView/classBlock/ClassBlockPopup';

class TimeTable extends Component{
	constructor (props) {
		super(props);

		this.state = {
			tables: [], 
			day: this.props.day, 
			classBlockPopupClass: {name: "ქართული"}, 
			classBlockPopupVisible: false
		};
	
		this.showPopup = this.showPopup.bind(this);
		this.hidePopup = this.hidePopup.bind(this);
		this.getClassBlockDetails = this.getClassBlockDetails.bind(this);

		this.rawData = {};
	}

	processTables(rawData) {
		let dayName;
		const tables = rawData.tables.map(data => {
			// Get the name of the current day
			dayName = Object.keys(data);

			// Add all the classes to the blocks list 
			let blocks = data[dayName]
				.map(row => {
					const [ n, s, f ] = row.split(",");
					return {
						name: n, 
						start: s, 
						finish: f
					};
				});

			// Add all the breaks to the list
			const len = blocks.length-1;
			for(let i = 0; i < len; i++)
				if (blocks[i].finish !== blocks[i+1].start)
					blocks.push({
						name: "break",
						start: blocks[i].finish,
						finish: blocks[i+1].start
					});

			// Calculate starts and finishes in minutes
			blocks = blocks.map(block => {
				const start = block.start.split(":");
				const finish = block.finish.split(":");
				return {
					...block, 
					int_start: parseInt(start[0])*60 + parseInt(start[1]),
					int_finish: parseInt(finish[0])*60 + parseInt(finish[1]),
					id: block.name+"s"+block.start+"e"+block.end+"d"+dayName
				};
			});

			// Return blocks sorted by start time 
			return blocks.sort((a, b) => a.int_start - b.int_start);
		});

		return { tables, dayName };
	}

	componentDidMount() {
		fetch(`/cxrili/timetable/11g.json`)
		.then(res => res.json())
		.then(rawData => {
			this.rawData = rawData;

			this.setState(() => {
				const {tables, dayName} = this.processTables(rawData);
				const today = tables[this.props.day];
				const int_start = today[0].int_start;
				const int_finish = today[today.length-1].int_finish;

				return {
					tables,
					int_start,
					int_finish,
					dayName
				};
			})
		})
	}

	getClassBlockDetails(blockIndex) {
		let block = this.state.tables[this.props.day][blockIndex];
		return {...block, teacher: this.rawData.teachers[block.name]}
	}

	showPopup(blockIndex) {
		this.setState({
			classBlockPopupVisible: true,
			classBlockPopupClass: this.state.tables[this.props.day][blockIndex]
		});
	}

	hidePopup() {
		this.setState({
			classBlockPopupVisible: false
		});
	}
	
	render () {
		return (
			<div className="content-box">
				<ul className="time-table-timeline">
					{
						this.state.tables.length > 0 && this.state.tables[this.props.day].map((entry, index) => 
							<ClassBlock
								key={index} 
								blockIndex={index}
								classData={entry}
								isToday={this.props.today === this.props.day}
								showPopup={this.showPopup}
								getClassBlockDetails={this.getClassBlockDetails}/>
						)
					}
					{
						this.props.today === this.props.day && this.state.int_finish && this.state.int_start &&	
						<TotalTimer
							int_start={this.state.int_start}
							int_finish={this.state.int_finish}
							shouldUpdate={this.props.today === this.props.day}
						/>
					}
				</ul>
				<ClassBlockPopup 
					visible={this.state.classBlockPopupVisible} 
					dayName={this.state.dayName}
					classData={this.state.classBlockPopupClass}
					hide={this.hidePopup}/>
			</div>
		);
	}
};

export default TimeTable;
