import React from 'react';
import {Link} from 'react-router-dom';

const HomeButton = () =>
	<Link to="/week" >
		<button className="home">
			ცხრილი
		</button>
	</Link>

export default HomeButton