import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import Calendar from 'react-calendar';

const SelectPeriod = ({ clickFunc, }) => {
	const { filterAttrOpenIndx } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === 2 ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [date, setDate] = useState(new Date());

	const OCDate = useCallback((date) => {
		setDate(date);
	}, [date]);

	return (
		<div className={wrapClassName}>
			<div className='select-btn' onClick={clickFunc}>
				기간
				<KeyboardArrowDown />
			</div>
			<div className="data-list">
				<Calendar
					value={date}
					onChange={OCDate}
					selectRange={true}
				/>
			</div>
		</div>
	);
};

SelectPeriod.propTypes = {

};

export default SelectPeriod;
