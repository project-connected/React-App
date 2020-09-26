import React from 'react';
import PropTypes from 'prop-types';

const BackGround = ({ mode="component", open, setOpen, children }) => {

	const CloseDetail = useCallback((e) => {
		e.preventDefault();
		setOpen(false);
	}, []);

	const backgroundClass = open ? "back-btn visible" : "back-btn hide";

	return (
		<>
			{open && children}
			{ mode === 'component' && <div className={backgroundClass} onClick={CloseDetail} />}
		</>
	);
};

BackGround.propTypes = {

};

export default BackGround;
