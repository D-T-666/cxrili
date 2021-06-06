import React, { useRef } from 'react'

const HomeworkCreation = () => {
	const tables = ['11 - გ'];
	const classes = ['მათემატიკა', 'ქართული', 'ქიმია', 'ფიზიკა'];

	// -- Refs ---
	const contentRef = useRef();
	const classRef = useRef();
	const tableRef = useRef();
	const priorityRef = useRef();
	const dayRef = useRef();

	const suppress = e => {
		e.stopPropagation();
		e.preventDefault();
	}

	return (
		<div className="homework-creation">
			<form onSubmit={e=>e.preventDefault()}>
				<textarea onClick={suppress} rows={8} />
				<table>
					<tr className="options">
						<td>
							<select className="tables">
								{tables.map(table => <option value={table}> {table} </option>)}
							</select>
						</td>
						<td>
							<select className="classes">
								{classes.map(cls => <option value={cls}> {cls} </option>)}
							</select>
						</td>
						<td>
							<input type="number" 
										 className={"priorities p"+(priorityRef.current ? priorityRef.current.value : "")}
										 ref={priorityRef}
										 max={4} min={1} placeholder={2} />
						</td>
					</tr>
					<tr className="options">
						<td colSpan={3}>
						   <input type="date" placeholder="2020-06-06" min="2020-06-05" max="2020-12-31" />
						</td>
					</tr>
				</table>
			</form>
		</div>
	)
}

export default HomeworkCreation
