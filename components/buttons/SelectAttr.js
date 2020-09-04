import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import { CLOSE_ALL_COMP2, OPEN_FILTER_ATTR } from '../../reducers/project';


const SelectAttr = ({ open=false, val, status="create", name, data, idx, getAction, onSearchBar=true}) => {
	const dispatch = useDispatch();
	const { filterAttrOpenIndx, search_region, search_theme } = useSelector(state=>state.project);

	const wrapClassName = filterAttrOpenIndx === idx ? 'select-btn-wrap clicked' : 'select-btn-wrap';

	const [attrName, setAttrName] = useState(name);
	const [text, setText] = useState('');
	const [attrs, setAttrs] = useState(data);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		setAttrs(data.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
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
		if (status === "many") {
			getAction(attr);
			setText('');
			setAttrs(data);
		}
		if (status === "create")
			setAttrName(attr.value);
		if (status === "profile") {
			setAttrName(attr.value);
			getAction(attr);
			setText('');
			setAttrs(data);
			dispatch({
				type: CLOSE_ALL_COMP2
			})
			return ;
		}
		if (idx === 0) {
			if (!search_region.find(v => v.key === attr.key))
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
			if (!search_theme.find(v => v.key === attr.key))
			{
				dispatch({
					type: getAction,
					data: attr,
				})
				dispatch({
					type: CLOSE_ALL_COMP2
				})
			}
		} if (idx === 12) {
			console.log(12);
		} // 수정해야함
		else {
			dispatch({
				type: getAction,
				data: attr,
			})
			dispatch({
				type: CLOSE_ALL_COMP2
			})
		}
	}, [text, attrs, val]);


	return (
		<div className={open ? 'select-btn-wrap opened' : wrapClassName}>
			{!open && <div className='select-btn' onClick={openAttr}>
				{attrName}
				<KeyboardArrowDown />
			</div>}
			<div className="data-list">
				{ onSearchBar &&
					<div className="data-list-search">
						<input type="text" value={text} onChange={OCText}/>
						<Search />
					</div>
				}
				<div className="list-box">
					{attrs.map((c, i) => {
						return (
							<div key={(c.key)} className="attribute" onClick={getAttrs(c)}>
								{c.value}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

SelectAttr.propTypes = {

};

export default SelectAttr;
