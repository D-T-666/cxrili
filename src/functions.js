// HMS - Hour Minute Second

export const getTimeHMS = (stringified) => {
	// Store the current date in the HMS object.
	const date = new Date();
	const HMS = {
		h: -10+date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds(),
	};

	// If requested as stringified i.e. {"hh", "mm", "ss"}
	if (stringified) {
		return stringifyHMS(HMS);
	}
	return HMS;
};

export const getTimeInMinutes = () => {
	// Returns minutes past after midnight i.e. 2 AM -> 120 (minutes)
	const { h, m } = getTimeHMS();
	return h * 60 + m;
};

export const getTimeInSeconds = () => {
	// Returns seconds past after midnight i.e. 2 AM -> 7200 (seconds)
	const { h, m, s } = getTimeHMS();
	return h * 3600 + m * 60 + s;
};

export const timeLeftToHMS = (minutes) => {
	// Returns the time left to a certain minute stamp in HMS format
	const { s } = getTimeHMS();
	return {
		h: Math.floor(minutes / 60),
		m: (minutes % 60) - 1,
		s: 60 - s,
	};
};

export const stringifyHMS = ({ h, m, s }) => {
	// Returns stringified HMS -> {"hh", "mm", "ss"}
	return {
		h: String(h).padStart(2, "0"),
		m: String(m).padStart(2, "0"),
		s: String(s).padStart(2, "0"),
	};
};
