import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown } from '@material-ui/icons';
import { OPEN_FILTER_ATTR } from '../../reducers/project';

const Calendar = dynamic(import('../DynamicCalendar'), {
	ssr: false,
});

const SelectPeriod = ({ name = '시작일', value, setValue, index = 3 }) => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx } = useSelector((state) => state.project);

	const wrapClassName =
		filterAttrOpenIndx === index
			? 'select-btn-wrap clicked'
			: 'select-btn-wrap';

	const OCDate = useCallback(
		(date) => {
			setValue(date);
		},
		[value],
	);

	const openAttr = useCallback(
		(e) => {
			e.preventDefault();
			if (index === filterAttrOpenIndx) {
				dispatch({
					type: OPEN_FILTER_ATTR,
					data: -1,
				});
				return;
			}
			dispatch({
				type: OPEN_FILTER_ATTR,
				data: index,
			});
		},
		[filterAttrOpenIndx],
	);

	return (
		<div className={wrapClassName}>
			<div className="select-btn" onClick={openAttr}>
				{name}
				<KeyboardArrowDown />
			</div>
			<div className="data-list dp-flex jc-center">
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

SelectPeriod.propTypes = {};

export default SelectPeriod;
