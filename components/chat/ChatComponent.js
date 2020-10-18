import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Close, KeyboardArrowLeft } from "@material-ui/icons";

import { defaultProfile } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_CHAT_ROOM_REQUEST, EXIT_CHAT_ROOM } from "../../reducers/chat";
import ChatRoom from "./ChatRoom";

const ChatComponent = ({ openChatComponent, onClickChatBtn }) => {
	const dispatch = useDispatch();
	const { isLoadedData } = useSelector((state) => state.chat);

	const backChatList = useCallback((e) => {
		e.preventDefault();
		dispatch({ type: EXIT_CHAT_ROOM });
	});

	const clickedChatRoom = useCallback((e) => {
		e.preventDefault();
		dispatch({
			type: OPEN_CHAT_ROOM_REQUEST,
		});
	});

	const dummy = [1, 2, 3, 4];

	return (
		<div id="chat-wrap" style={openChatComponent}>
			<div className="chat-header">
				Chat room
				{isLoadedData && (
					<button
						className="back-chat-list-btn"
						onClick={backChatList}
					>
						<KeyboardArrowLeft />
					</button>
				)}
				<button className="close-chat-wrap" onClick={onClickChatBtn}>
					<Close />
				</button>
			</div>
			<div className="chat-content">
				{isLoadedData ? (
					<ChatRoom />
				) : (
					<div className="chat-list">
						{dummy.map((i) => {
							return (
								<button onClick={clickedChatRoom} key={i}>
									<div className="chat-room-btn">
										<img src={defaultProfile} />
										<div className="chat-recent-message">
											<p>건강하세요?</p>
										</div>
									</div>
								</button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

ChatComponent.propTypes = {};

export default ChatComponent;
