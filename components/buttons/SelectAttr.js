import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { KeyboardArrowDown, Search } from '@material-ui/icons';

import useInput from '../../hooks/useInput';

const SelectAttr = ({ name, data, clickFunc, idx}) => {
	const { filterAttrOpenIndx } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === idx ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [text, OCText] = useInput('');


	return (
		<div className={wrapClassName}>
			<div className='select-btn' onClick={clickFunc}>
				{name}
				<KeyboardArrowDown />
			</div>
			<div className="data-list">
				<div className="data-list-search">
					<input type="text" value={text} onChange={OCText}/>
					<Search />
				</div>
				{data.map((c, i) => {
					return (
						<div key={(i)} className="attribute">
							{c}
						</div>
					);
				})}
			</div>
		</div>
	);
};

SelectAttr.propTypes = {

};

export default SelectAttr;
