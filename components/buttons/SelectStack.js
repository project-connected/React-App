import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { KeyboardArrowDown, Search } from '@material-ui/icons';

import useInput from '../../hooks/useInput';
import StackBlock from '../StackBlock';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_FILTER_ATTR, GET_STACK_FOR_SEARCH } from '../../reducers/project';

const SelectStack = ({ skills, getAction=GET_STACK_FOR_SEARCH }) => {
	const { filterAttrOpenIndx, search_stacks, create_stacks } = useSelector(state=>state.project);
	const dispatch = useDispatch();

	const wrapClassName = filterAttrOpenIndx === 4 ? 'select-btn-wrap stacks clicked' : 'select-btn-wrap stacks';

	const [text, setText] = useState('');
	const [stacks, setStacks] = useState(skills);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		e.preventDefault();
		setStacks(skills.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
	}, [text, stacks]);

	const cilckStack = useCallback((c) => (e) => {
		e.preventDefault();
		if (getAction === GET_STACK_FOR_SEARCH) {
			if (!search_stacks.find(v => v.key === c.key)) {
				dispatch({
					type: getAction,
					data: c,
				})
			}
		} else {
			if (!create_stacks.find(v => v.key === c.key)) {
				dispatch({
					type: getAction,
					data: c,
				})
			}
		}
	}, [search_stacks, create_stacks]);

	const openAttr = useCallback((e) => {
		e.preventDefault();
		if (4 === filterAttrOpenIndx) {
			dispatch({
				type: OPEN_FILTER_ATTR,
				data: -1,
			})
			return ;
		}
		dispatch({
			type: OPEN_FILTER_ATTR,
			data: 4,
		})
	}, [filterAttrOpenIndx]);

	return (
		<>
			<div className={wrapClassName}>
				<div className='select-btn' onClick={openAttr}>
					스택
					<KeyboardArrowDown />
				</div>
				<div className='data-list'>
					<div className="data-list-search">
						<input type="text" value={text} onChange={OCText}/>
						<Search />
					</div>
					<div className="project-card-stack-block-wrap">
						{stacks.map((c, i) => {
							return (
								<div onClick={cilckStack(c)} key={(c.key)} >
									<StackBlock name={c.value} color={c.color} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

SelectStack.propTypes = {

};

export default SelectStack;
