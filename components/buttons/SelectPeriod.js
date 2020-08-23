import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown } from '@material-ui/icons';
import Calendar from 'react-calendar';
import { OPEN_FILTER_ATTR, GET_PRIOD_FOR_SEARCH } from '../../reducers/project';

const SelectPeriod = ({ name="시작일" }) => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === 3 ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [date, setDate] = useState(new Date());

	const OCDate = useCallback((date) => {
		setDate(date);
		dispatch({
			type: GET_PRIOD_FOR_SEARCH,
			data: date,
		})
	}, [date]);

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
					value={date}
					onChange={OCDate}
				/>
			</div>
		</div>
	);
};

SelectPeriod.propTypes = {

};

export default SelectPeriod;
