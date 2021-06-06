import React, { useState, useRef, useEffect } from 'react'
import NotesIndicator from 'components/dayView/classBlock/blockDetails/NotesIndicator';
import DaySection from './DaySection';
import { More, Less } from 'iconComponents';

const ClassSection = ({days, cls, parentBlockExpanded, setParentBlockExpanded}) => {
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
		if(!expanded) {
			setElementsVisible(true);
			setParentBlockExpanded(cls);
			setTimeout(() => me.current.scrollIntoView({behavior:"smooth"}), 600, false);
			setTimeout(() => setExpanded(true), 1, false);
		} else {
			setExpanded(false);
			setTimeout(() => setElementsVisible(false), 300, false);
		}
	}

	return (
		<section className={"class-section" + (expanded ? " expanded" : "")} ref={me}>
			<h1 className="class-section-title" onClick={handleClick}>
				{cls + " "}
				<div className="flex">
					<NotesIndicator number={days.number} show={!expanded} />
					{ expanded 	? <Less />
											: <More /> }
				</div>
			</h1>

			{	elementsVisible &&
				<div className={"notes unlimited" + (expanded ? " expanded" : "")} id={cls} onClick={handleClick}>
					{
						Object.keys(days).map(cls => cls !== "number" && (
							<DaySection cls={cls} days={days} />
						))
					}
				</div>
			}
		</section>
	)
}

export default ClassSection
