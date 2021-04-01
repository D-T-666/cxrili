const timeOffset = {
	h: -9,
	m: 25,
	s: 0,
}; // Should be all zeros for production

export const getTimeHMS = (stringified) => {
	const date = new Date();
	const HMS = {
		h: timeOffset.h + date.getHours(),
		m: timeOffset.m + date.getMinutes(),
		s: timeOffset.s + date.getSeconds(),
	};
	return stringified ? stringifyHMS(HMS) : HMS;
};

export const getTimeInMinutes = () => {
	const { h, m } = getTimeHMS();
	return h * 60 + m;
};

export const getTimeInSeconds = () => {
	const { h, m, s } = getTimeHMS();
	return h * 3600 + m * 60 + s;
};

export const timeLeftToHMS = (minutes) => {
	const { s } = getTimeHMS();
	return {
		h: Math.floor(minutes / 60),
		m: (minutes % 60) - 1,
		s: 60 - s,
	};
};

export const stringifyHMS = ({ h, m, s }) => {
	return {
		h: String(h).padStart(2, "0"),
		m: String(m).padStart(2, "0"),
		s: String(s).padStart(2, "0"),
	};
};
