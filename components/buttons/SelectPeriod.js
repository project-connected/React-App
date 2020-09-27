import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown } from '@material-ui/icons';
import Calendar from 'react-calendar';
import { OPEN_FILTER_ATTR } from '../../reducers/project';

const SelectPeriod = ({ name="시작일", value, setValue }) => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === 3 ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const OCDate = useCallback((date) => {
		setValue(date);
	}, [value]);

	const openAttr = useCallback((e) => {
		e.preventDefault();
		if (3 === filterAttrOpenIndx) {
			dispatch({
				type: OPEN_FILTER_ATTR,
				data: -1,
			})
			return ;
		}
		dispatch({
			type: OPEN_FILTER_ATTR,
			data: 3,
		})
	}, [filterAttrOpenIndx]);

	return (
		<div className={wrapClassName}>
			<div className='select-btn' onClick={openAttr}>
				{name}
				<KeyboardArrowDown />
			</div>
			<div className="data-list">
				<Calendar
					value={value}
					onChange={OCDate}
					calendarType="US"
					locale="ko-KR"
				/>
			</div>
		</div>
	);
};

SelectPeriod.propTypes = {

};

export default SelectPeriod;
