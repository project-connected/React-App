import React from 'react';

const StackBlock = ({ color='black', name }) => {
	return (
		<span className='stack-block' style={{
			background: color
		}}>
			{name}
		</span>
	);
};

export default StackBlock;
