import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import Calendar from 'react-calendar';
import { OPEN_FILTER_ATTR } from '../../reducers/project';

const SelectPeriod = () => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === 2 ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [date, setDate] = useState(new Date().toLocaleDateString('ko-KR'));

	const OCDate = useCallback((date) => {
		setDate(date);
	}, [date]);

	const openAttr = useCallback((e) => {
		e.preventDefault();
		if (2 === filterAttrOpenIndx) {
			dispatch({
				type: OPEN_FILTER_ATTR,
				data: -1,
			})
			return ;
		}
		dispatch({
			type: OPEN_FILTER_ATTR,
			data: 2,
		})
	}, [filterAttrOpenIndx]);

	return (
		<div className={wrapClassName}>
			<div className='select-btn' onClick={openAttr}>
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
