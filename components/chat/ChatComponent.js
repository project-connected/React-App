import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@material-ui/icons';

import { DummyProfile } from '../../containers/AppLayout';

const ChatComponent = ({ openChatComponent, onClickChatBtn }) => {
	return (
		<div id="chat-wrap" style={openChatComponent}>
			<div className="chat-header">
				Chat room
				<button onClick={onClickChatBtn}>
					<Close />
				</button>
			</div>
			<div className="chat-list">
				<div className="chat-room">
					<DummyProfile />
					<div className="chat-recent-message">
						<p>
							건강하세요?
						</p>
					</div>
				</div>
				<div className="chat-room">
					<DummyProfile />
					<div className="chat-recent-message">
						<p>
							건강하세요?
						</p>
					</div>
				</div>
				<div className="chat-room">
					<DummyProfile />
					<div className="chat-recent-message">
						<p>
							건강하세요?
						</p>
					</div>
				</div>
				<div className="chat-room">
					<DummyProfile />
					<div className="chat-recent-message">
						<p>
							건강하세요?
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

ChatComponent.propTypes = {

};

export default ChatComponent;
