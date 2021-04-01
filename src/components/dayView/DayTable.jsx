import React, { Component } from 'react';
import ClassTimeBlock from "./ClassTimeBlock.jsx";
import TotalTimer from 'components/dayView/TotalTimer.jsx';

class TimeTable extends Component{
	constructor (props) {
		super(props);

		this.state = {tables: [], day: this.props.day};
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData() {
		// TODO: rework this function
		fetch(`/timetable/11g.json`)
		.then(res => res.json())
		.then(wholeTable => {
			this.setState(state => {
				const tables = wholeTable.tables.map(data => {
					let blocks = data
						.map(row => {
							const cols = row.split(",");

							return {
								name: cols[0], 
								start: cols[1], 
								finish: cols[2]
							}
						});
		
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

					console.log()
		
					return blocks.sort((a, b) => a.int_start - b.int_start);
				});

				const int_start = tables[this.props.day][0].int_start;
				const int_finish = tables[this.props.day][tables[this.props.day].length-1].int_finish;

				return {
					tables,
					int_start,
					int_finish
				};
			})
		})
	}
	
	render () {
		return (
			<ul className="time-table-timeline content-box">
				{
					this.state.tables.length > 0 && this.state.tables[this.props.day].map((entry, index) => 
						<ClassTimeBlock key={index} 
														name={entry.name} 
														start={entry.start} 
														finish={entry.finish}
														int_start={entry.int_start}
														int_finish={entry.int_finish}
														isToday={this.props.today === this.props.day}/>
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
		);
	}
};

export default TimeTable;
