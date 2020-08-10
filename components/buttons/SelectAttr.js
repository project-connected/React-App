import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import { CLOSE_ALL_COMP2 } from '../../reducers/project';


const SelectAttr = ({ name, data, clickFunc, idx, getAction}) => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx, search_region, search_theme } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === idx ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [text, setText] = useState('');
	const [attrs, setAttrs] = useState(data);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		setAttrs(data.filter(v => v.toLowerCase().match(e.target.value.toLowerCase())));
	}, [text]);

	const getAttrs = useCallback((attr) => (e) => {
		e.preventDefault();
		console.log(attr)
		if (idx === 0) {
			if (!search_region.find(v => v === attr))
			{
				dispatch({
					type: getAction,
					data: attr,
				})
				dispatch({
					type: CLOSE_ALL_COMP2
				})
			}
		} else  if (idx === 1) {
			if (!search_theme.find(v => v === attr))
			{
				dispatch({
					type: getAction,
					data: attr,
				})
				dispatch({
					type: CLOSE_ALL_COMP2
				})
			}
		} else {
			dispatch({
				type: getAction,
				data: attr,
			})
		}
	})


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
				{attrs.map((c, i) => {
					return (
						<div key={(i)} className="attribute" onClick={getAttrs(c)}>
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
