import { useRef, useState, useEffect } from 'react';
import BlockTimers from 'components/dayView/classBlock/timers/BlockTimers';
import ClassBlockDetails from 'components/dayView/classBlock/blockDetails/ClassBlockDetails';
import 'css/dayView/class-block/class-block.scss';
import NotesIndicator from './blockDetails/NotesIndicator';

import { More, Less } from 'iconComponents';

const ClassTimeBlock = ({classData, isToday, blockExpanded, setBlockExpanded}) => {
	const [active, setActive] = useState(false);
	const [timeLeft, setTimeLeft] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [id, setId] = useState(classData.id);

	const me = useRef();

	const changeActive = newActive => setActive(newActive && isToday);

	const toggleExpanded = () => {
		if(!expanded) {
			setBlockExpanded(id);
			// me.current.scrollIntoView({block:"start", behavior:"smooth"})
			setTimeout(() => me.current.scrollIntoView({behavior:"smooth"}), 400, false);
		}
		setExpanded(old => !old);
	}

	const getBlockClassName = () => {
		let classList = ["class-block"];

		classList.push(classData.name === "break" ? "break" : "class")

		if (active) classList.push("active");

		let duration = classData.int_end-classData.int_start;
		if((classData.name === "break" ? 7.5 : 32.5) < duration)
			classList.push("long")
		else
			classList.push("short")

		if(expanded) classList.push("expanded");

		if(classData.notes.length > 0) classList.push("has-homework");

		return classList.join(" ")
	};

	useEffect(() => {
		if (id !== classData.id) {
			setId(classData.id);
			setExpanded(false);
		}
	}, [classData]);

	useEffect(() => {
		if (id !== blockExpanded)
			setExpanded(false);
	}, [blockExpanded]);

	useEffect(() => {
		if (active)
			setTimeout(() => me.current.scrollIntoView({behavior: "smooth",  block: "center"}), 500, false);
	}, [active])

	return (
		<section className={getBlockClassName()} onClick={toggleExpanded} ref={me}>
			<div className="title"  style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
				{
					classData.name !== "break" && 
					<>
						<h2 className="class-name"> {classData.name} </h2>
						<div style={{display:"flex",alignItems:"center"}}>
							<NotesIndicator number={classData.notes.length} show={classData.name !== "break" && !expanded}/>
							{
								classData.name !== "break" &&
								(expanded ? <Less />
													: <More />)
							}
						</div>
					</>
				}
			</div>
			<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:classData.name !== "break" && ".6rem"}}>
				<BlockTimers 
					expanded={active}
					classData={classData}
					showStartAndFinish={classData.name !== "break"}
					shouldUpdate={isToday}
					changeActive={changeActive}
					updateTimeLeft={setTimeLeft}/>
			</div>
			{
				classData.name !== "break" && 
				<ClassBlockDetails
					classData={classData} 
					expanded={expanded}
					timeLeft={timeLeft}/>
			}
		</section>
	)
}

export default ClassTimeBlock