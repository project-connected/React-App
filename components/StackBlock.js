import React from 'react';

const StackBlock = ({ color='black', name, onClick }) => {
	return (
		<span className='stack-block' onClick={onClick} style={{
			background: color
		}}>
			{name}
		</span>
	);
};

export default StackBlock;
