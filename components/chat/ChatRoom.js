import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Mood } from '@material-ui/icons';

import useInputWithSetter from '../../hooks/useInputWithSetter';

const dummyChatLog = [
	{
		id: 1,
		name: 'yojo',
		text: '건강하신가요?'
	},
	{
		id: 1,
		name: 'yojo',
		text: '건강하신가요?'
	},
	{
		id: 2,
		name: 'han',
		text: '네 건강합니다.'
	},
	{
		id: 1,
		name: 'yojo',
		text: '건강하신가요?'
	},
	{
		id: 1,
		name: 'yojo',
		text: '건강하신가요?'
	},
	{
		id: 2,
		name: 'han',
		text: '네 건강합니다.'
	},
	{
		id: 1,
		name: 'yojo',
		text: '건강하신가요?'
	},
]

const ChatRoom = () => {
	const [msg, setMsg, OCMsg] = useInputWithSetter('');

	const sendMessage = useCallback((e) => {
		e.preventDefault();
		console.log(msg);
		if (msg !== '')
		{
			dummyChatLog.push({
			id: 2,
			name: 'han',
			text: msg,
			})
		}
		setMsg('');
		console.log(dummyChatLog)
	}, [msg, dummyChatLog])

	return (
		<div data-aos="pade-up" className="chat-room">
			<div className="chat-log-wrap">
				{dummyChatLog.map((c, i) => {
					return (
						<div key={(i)}>
						{ c.id === 2 ?
							<div className="msg-container myMsg">
								<div className="chat-room-profile">
									<Mood />
								</div>
								<div className="msgBox">
									{c.text}
								</div>
							</div>
						:
							<div className="msg-container">
								<div className="chat-room-profile">
									<Mood />
								</div>
								<div className="msgBox">
									{c.text}
								</div>
							</div>
						}
						</div>
					);
				})}
			</div>
			<form onSubmit={sendMessage} className="chat-ipt-wrap">
				<input type="text" value={msg} onChange={OCMsg} placeholder="메세지를 입력하세요." name="messageInput" />
				<button onClick={sendMessage}>
					<span>
						보내기
					</span>
				</button>
			</form>
		</div>
	);
};

ChatRoom.propTypes = {

};

export default ChatRoom;
