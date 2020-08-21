import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import { CLOSE_ALL_COMP2, OPEN_FILTER_ATTR } from '../../reducers/project';


const SelectAttr = ({ status="create", name, data, idx, getAction, onSearchBar=true}) => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx, search_region, search_theme } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === idx ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [attrName, setAttrName] = useState(name);
	const [text, setText] = useState('');
	const [attrs, setAttrs] = useState(data);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		setAttrs(data.filter(v => v.toLowerCase().match(e.target.value.toLowerCase())));
	}, [text]);

	const openAttr = useCallback((e) => {
		e.preventDefault();
		if (idx === filterAttrOpenIndx) {
			dispatch({
				type: OPEN_FILTER_ATTR,
				data: -1,
			})
			return ;
		}
		dispatch({
			type: OPEN_FILTER_ATTR,
			data: idx,
		})
	}, [filterAttrOpenIndx]);

	const getAttrs = useCallback((attr) => (e) => {
		e.preventDefault();
		if (status === "create")
			setAttrName(attr);
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
			dispatch({
				type: CLOSE_ALL_COMP2
			})
		}
	})


	return (
		<div className={wrapClassName}>
			<div className='select-btn' onClick={openAttr}>
				{attrName}
				<KeyboardArrowDown />
			</div>
			<div className="data-list">
				{ onSearchBar &&
					<div className="data-list-search">
						<input type="text" value={text} onChange={OCText}/>
						<Search />
					</div>
				}
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
