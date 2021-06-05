import React from 'react'
import Note from 'components/dayView/classBlock/blockDetails/notes/Note'

const DaySection = ({cls, days}) => {
	const daynames = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი"];

	return (
		<section className={"day-section "+cls} key={cls+"daySection"}>
			<h5>{daynames[cls]}</h5>
			<div className="list">
				{
					days[cls].map(note => (
						<Note note={note} key={note.id}/>
					))
				}
			</div>
		</section>
	)
}

export default DaySection
