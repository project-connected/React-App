import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { KeyboardArrowDown, Search } from '@material-ui/icons';

import useInput from '../../hooks/useInput';
import StackBlock from '../StackBlock';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_FILTER_ATTR, GET_STACK_FOR_SEARCH } from '../../reducers/project';

const dummyStack = [
	{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
	}, {
		name: 'photoshop',
		color: '#187bcd',
	}, {
		name: 'React.JS',
		color: '#03254c',
	}, {
		name: 'Swift',
		color: '#FC6A03',
	},{
		name: 'JavaScript',
		color: '#FC6A03',
	},{
		name: 'C',
		color: '#4b00c1',
	},{
		name: 'C#',
		color: 'rgb(65, 169, 76)',
	},{
		name: 'C++',
		color: '#4b80a7',
	},{
		name: 'Java',
		color: '#fb5743',
	},{
		name: 'Go',
		color: '#74bdf0',
	},{
		name: 'R',
		color: '#74a9ff',
	},{
		name: 'Python',
		color: '#e7ec00',
	},{
		name: 'Spring',
		color: 'rgb(65, 169, 76)',
	},{
		name: 'PHP',
		color: '#9b7ed0',
	},{
		name: 'Andriod',
		color: '#88d686',
	},
]

const SelectStack = ({ getAction=GET_STACK_FOR_SEARCH }) => {
	const { filterAttrOpenIndx, search_stacks, create_stacks } = useSelector(state=>state.project);
	const dispatch = useDispatch();

	const wrapClassName = filterAttrOpenIndx === 4 ? 'select-btn-wrap stacks clicked' : 'select-btn-wrap stacks';

	const [text, setText] = useState('');
	const [data, setData] = useState(dummyStack);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		e.preventDefault();
		setData(dummyStack.filter(v => v.name.toLowerCase().match(e.target.value.toLowerCase())));
	}, [text, data]);

	const cilckStack = useCallback((c) => (e) => {
		e.preventDefault();
		if (getAction === GET_STACK_FOR_SEARCH) {
			if (!search_stacks.find(v => v.name === c.name)) {
				dispatch({
					type: getAction,
					data: c,
				})
			}
		} else {
			if (!create_stacks.find(v => v.name === c.name)) {
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
						{data.map((c, i) => {
							return (
								<div onClick={cilckStack(c)} key={(i)} >
									<StackBlock name={c.name} color={c.color} />
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
