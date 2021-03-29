import React, { Component } from 'react';
import 'css/weekview.css';
import DayTableBlock from "components/weekView/DayTableBlock.jsx";

class TimeTable extends Component{
	constructor (props) {
		super(props);

		this.state = {tables: [], day: this.props.day};

		this.weekdays = [
			'ორშაბათი',
			'სამშაბათი',
			'ოთხშაბათი',
			'ხუთშაბათი',
			'პარასკევი'
		];
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		// TODO: rework this function
		fetch(`/cxrili/timetable/11g.json`)
		.then(res => res.json())
		.then(wholeTable => {
			this.setState({
				tables: wholeTable.tables.map(data => {
					let blocks = data
						.split(/[\r|\n]+/)
						.map(row => row.split(",")[0]);

					return blocks.sort((a, b) => a.int_start - b.int_start);
				})
			})
		})
	}
	
	render () {
		return (
			<div className="week-table content-box">
				{
					this.state.tables.map((entry, index) => 
						<DayTableBlock 
											key={index}
											day={index}
											name={this.weekdays[index]}
											table={entry} 
											isToday={this.props.today === index}/>
					)
				}
			</div>
		);
	}
};

export default TimeTable;
