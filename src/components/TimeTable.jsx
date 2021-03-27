import React, { Component } from 'react';
import ClassTimeBlock from "./dayView/ClassTimeBlock.jsx";

class TimeTable extends Component{
	constructor (props) {
		super(props);

		this.state = {tables: [], day: this.props.day};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		// TODO: rework this function
		fetch(`timetable/11g.json`)
		.then(res => res.json())
		.then(wholeTable => {
			this.setState({
				tables: wholeTable.tables.map(data => {
					let blocks = data
						.split(/[\r|\n]+/)
						.map(row => ({
							name: row.split(",")[0], 
							start: row.split(",")[1], 
							finish: row.split(",")[2]
						}));
		
					let len = blocks.length;
					for(let i = 0; i < len-1; i++) {
						if (blocks[i].finish !== blocks[i+1].start)
							blocks.push({
								name: "break",
								start: blocks[i].finish,
								finish: blocks[i+1].start
							});
					}
		
					blocks = blocks.map(block => ({
						...block, 
						int_start: parseInt(block.start.split(":")[0])*60 + parseInt(block.start.split(":")[1]),
						int_finish: parseInt(block.finish.split(":")[0])*60 + parseInt(block.finish.split(":")[1])
					}));
		
					return blocks.sort((a, b) => a.int_start - b.int_start);
				})
			})
		})
	}
	
	render () {
		return (
			<ul className="time-table-timeline">
				{
					this.state.tables.length > 0 && this.state.tables[this.props.day].map((entry, index) => 
						<ClassTimeBlock 
											key={index} 
											name={entry.name} 
											start={entry.start} 
											finish={entry.finish}
											int_start={entry.int_start}
											int_finish={entry.int_finish}
											isToday={this.props.today === this.props.day}/>
					)
				}
			</ul>
		);
	}
};

export default TimeTable;
