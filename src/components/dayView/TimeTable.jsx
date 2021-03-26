import React, { Component } from 'react';
import ClassTimeBlock from "./ClassTimeBlock.jsx";

class TimeTable extends Component{
	constructor (props) {
		super(props);

		this.state = {classes: [], day: this.props.day};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		// TODO: rework this function
		fetch(`/timetable/11 - გ/${this.state.day}.csv`)
		.then(res => res.text())
		.then(data => {
			let classes = data
				.split(/\r/)
				.map(row => ({
					name: row.split(",")[0], 
					start: row.split(",")[1], 
					finish: row.split(",")[2]
				}));

			let breaks = [];
			for(let i = 0; i < classes.length-1; i++) {
				if (classes[i].finish !== classes[i+1].start)
					breaks.push({
						name: "break",
						start: classes[i].finish,
						finish: classes[i+1].start
					});
			}

			let blocks = [...classes, ...breaks];

			blocks = blocks.map(block => ({
				...block, 
				int_start: parseInt(block.start.split(":")[0])*60 + parseInt(block.start.split(":")[1]),
				int_finish: parseInt(block.finish.split(":")[0])*60 + parseInt(block.finish.split(":")[1])
			}));

			blocks = blocks.sort((a, b) => a.int_start - b.int_start)

			this.setState({
				classes: blocks
			});
		})
	}
	
	render () {
		return (
			<ul className={"time-table-timeline" + (this.state.day === this.props.currentDay? "": " invisible")}>
				{
					this.state.classes.map(entry => 
						<ClassTimeBlock 
											key={entry.name+entry.start} 
											name={entry.name} 
											start={entry.start} 
											finish={entry.finish}
											int_start={entry.int_start}
											int_finish={entry.int_finish}/>
					)
				}
			</ul>
		);
	}
};

export default TimeTable;
