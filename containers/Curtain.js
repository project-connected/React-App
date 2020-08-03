import React from 'react';
import PropTypes from 'prop-types';

const Curtain = ({ component }) => {
	return (
		<div className="curtain">
			{component}
		</div>
	);
};

Curtain.propTypes = {

};

export default Curtain;
