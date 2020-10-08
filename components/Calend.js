import React, { useRef, useCallback } from 'react';
import Calendar from 'react-calendar';

const Calend = ({ value, onChange }) => {
	return (
		<Calendar
			value={value}
			onChange={onChange}
			calendarType="US"
		/>
	);
}

export default Calend;
