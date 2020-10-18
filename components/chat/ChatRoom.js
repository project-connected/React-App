import React, { useCallback, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import useInputWithSetter from "../../hooks/useInputWithSetter";
import { defaultProfile } from "../../config/config";

const chatLog = [
	{
		id: 1,
		name: "아이유",
		text: "건강하신가요?",
	},
	{
		id: 1,
		name: "아이유",
		text: "건강하신가요?",
	},
	{
		id: 2,
		name: "han",
		text: "네 건강합니다.",
	},
	{
		id: 1,
		name: "아이유",
		text: "건강하신가요?",
	},
	{
		id: 1,
		name: "아이유",
		text: "건강하신가요?",
	},
	{
		id: 2,
		name: "han",
		text: "네 건강합니다.",
	},
	{
		id: 1,
		name: "아이유",
		text: "건강하신가요?",
	},
];

const ChatRoom = () => {
	const [msg, setMsg, OCMsg] = useInputWithSetter("");
	const [dummyChatLog, setdl] = useState(chatLog);
	const chatRef = useRef();

	const sendMessage = useCallback(
		(e) => {
			e.preventDefault();
			console.log(msg);
			if (msg !== "") {
				setdl([
					...dummyChatLog,
					{
						id: 2,
						name: "han",
						text: msg,
					},
				]);
			}
			setMsg("");
		},
		[msg, dummyChatLog, chatRef]
	);

	useEffect(() => {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}, [chatRef, dummyChatLog]);

	return (
		<div data-aos="pade-up" className="chat-room">
			<div ref={chatRef} className="chat-log-wrap">
				{dummyChatLog.map((c, i) => {
					return (
						<div key={i}>
							{c.id === 2 ? (
								<div className="msg-container myMsg">
									<div className="msg-box">
										<div className="msg-content">
											{c.text}
										</div>
									</div>
								</div>
							) : (
								<div className="msg-container other-user">
									<img
										src={defaultProfile}
										className="chat-room-profile"
									/>
									<div className="msg-box">
										<p className="msg-name">{c.name}</p>
										<div className="msg-content">
											{c.text}
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<form onSubmit={sendMessage} className="chat-ipt-wrap">
				<input
					autoComplete="off"
					type="text"
					value={msg}
					onChange={OCMsg}
					placeholder="메세지를 입력하세요."
					name="messageInput"
				/>
				<button onClick={sendMessage}>
					<span>보내기</span>
				</button>
			</form>
		</div>
	);
};

ChatRoom.propTypes = {};

export default ChatRoom;
