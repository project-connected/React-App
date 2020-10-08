import React, {useCallback} from 'react';

const BackGround = ({ mode="component", open, setOpen, children, zIndex=100 }) => {

	const CloseDetail = useCallback((e) => {
		e.preventDefault();
		setOpen(false);
	}, []);

	const backgroundClass = open ? "back-btn visible" : "back-btn hide";

	return (
		<>
			{open && children}
			{ mode === 'component' && open && <div className={backgroundClass} onClick={CloseDetail} style={{zIndex: zIndex}}/>}
		</>
	);
};

export default BackGround;
