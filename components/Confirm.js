import React from 'react';

const Confirm = ({ closeFunction, confirmFunction, content="select Yes Or No", confirm="YES", close="NO", loading=false }) => {
	return (
		<div className="confirm-box">
			{loading ?
				<>
					<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
				</>
			:
				<>
				<p>{content}</p>
				<div className="confirm-box-btn-container">
					<div className="confirm-btn left" onClick={confirmFunction}>{confirm}</div>
					<div className="confirm-btn right" onClick={closeFunction}>{close}</div>
				</div>
				</>
			}
		</div>
	)
}

export default Confirm;
