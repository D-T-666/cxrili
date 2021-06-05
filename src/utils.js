// HMS - Hour Minute Second

export const getTimeHMS = (stringified) => {
	// Store the current date in the HMS object.
	const date = new Date();
	const HMS = {
		h: date.getHours(),//11,//
		m: date.getMinutes(),//%5+15,
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

export const time_ago = (time) => {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  let time_formats = [
    [60, 'წამის', 1], // 60
    [120, '1 წუთის წინ', '1 წუთში'], // 60*2
    [3600, 'წუთის', 60], // 60*60, 60
    [7200, '1 საათის წინ', '1 საათში'], // 60*60*2
    [86400, 'საათის', 3600], // 60*60*24, 60*60
    [172800, 'გუშინ', 'ხვალ'], // 60*60*24*2
    [604800, 'დღის', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'წინა კვირას', 'შემდეგ კვირას'], // 60*60*24*7*4*2
    [2419200, 'კვირის', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'წინა თვეში', 'შემდეგ თვეში'], // 60*60*24*7*4*2
    [29030400, 'თვის', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'შარშან', 'მომავალ წელს'], // 60*60*24*7*4*12*2
    [2903040000, 'წლის', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'წინა საუკუნეში', 'შემდეგ საუკუნეში'], // 60*60*24*7*4*12*100*2
    [58060800000, 'საუკუნის', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  let seconds = (+new Date() - time) / 1000,
    token = 'წინ',
    list_choice = 1;

  if (seconds == 0)
    return 'ახლა'

  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'შემდეგ';
    list_choice = 2;
  }
  let i = 0,
    	format;

  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}