import React, { useState, useRef, useEffect } from 'react'
import Note from 'components/dayView/classBlock/blockDetails/notes/Note';
import NotesIndicator from 'components/dayView/classBlock/blockDetails/NotesIndicator';
import { More, Less } from 'iconComponents';

const ClassSection = ({days, cls, parentBlockExpanded, setParentBlockExpanded}) => {
	const daynames = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი"];
	const [ expanded, setExpanded ] = useState(false);
	const [ elementsVisible, setElementsVisible ] = useState(false);
	const me = useRef();

	useEffect(() => {
		if (cls !== parentBlockExpanded){
			setExpanded(false);
			setTimeout(() => setElementsVisible(false), 300, false);
		}
	}, [parentBlockExpanded]);

	const handleClick = (e) => {
		e.stopPropagation();
		setExpanded(old => !old);
		if(!expanded) {
			setParentBlockExpanded(cls);
			setTimeout(() => me.current.scrollIntoView({behavior:"smooth"}), 600, false);
			setElementsVisible(true);
		} else {
			setTimeout(() => setElementsVisible(false), 300, false);
		}
	}

	return (
		<section className={"class-section"+(expanded?" expanded":"")} ref={me}>
			<h1 className="class-section-title" onClick={handleClick}>
				{cls+" "}
				<div className="flex">
					<NotesIndicator number={days.number} show={!expanded} />
					{ expanded 	? <Less />
											: <More /> }
				</div>
			</h1>

			{	elementsVisible &&
				<div className={"notes unlimited"+(expanded?" expanded":"")} id={cls} onClick={handleClick}>
					{
						Object.keys(days).map(cls => cls!=="number"&&(
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
						))
					}
				</div>
			}
		</section>
	)
}

export default ClassSection
