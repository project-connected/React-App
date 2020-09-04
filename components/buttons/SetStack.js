import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';

import StackBlock from '../StackBlock';
import { useSelector } from 'react-redux';

const SetStack = ({ stacks=[], value, setValue }) => {
	const [text, setText] = useState('');
	const [data, setData] = useState(stacks);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		e.preventDefault();
		setData(stacks.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
	}, [text, data]);

	const cilckStack = useCallback((c) => (e) => {
		e.preventDefault();
		setValue(c)
	}, [value]);

	useEffect(() => {
		console.log(value);
		// console.log(value.length())
		// value.find(v => elem.key === 'C');
	}, [value]);

	return (
		<>
			<div className="select-btn-wrap stack opened">
				{value &&
				<div className='data-list'>
					<div className="data-list-search">
						<input type="text" value={text} onChange={OCText}/>
						<Search />
					</div>
					<div className="project-card-stack-block-wrap">
						{data.filter(v => !value.find(elem => elem.key === v.key)).map((c, i) => {
							return (
								<div onClick={cilckStack(c)} key={(c.key)} >
									<StackBlock name={c.value} color={c.color} />
								</div>
							);
						})}
					</div>
				</div>
			}
			</div>
		</>
	);
};

SetStack.propTypes = {

};

export default SetStack;
