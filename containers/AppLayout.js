import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { Chat, Close } from '@material-ui/icons';
import { CLOSE_CHAT, OPEN_CHAT } from '../reducers/component';

const DummyProfile = () => {
	return (
		<img src="https://media.vlpt.us/images/yujo/profile/053c9bee-1076-418c-808d-f9a1b88dc445/KakaoTalk_20200229_162658088.jpg?w=240" />
	);
}

const AppLayout = ({ children }) => {
	const { openChat } = useSelector(state=>state.component);

	const dispatch = useDispatch();

	const openChatComponent = {
		transform: `translateY(${openChat ? 0 : 120}%)`
	}

	const onClickChatBtn = useCallback((e) => {
		e.preventDefault();
		if (openChat) {
			dispatch({
				type: CLOSE_CHAT
			})
		} else {
			dispatch({
				type: OPEN_CHAT
			})
		}
	}, [openChat]);

	return (
		<div id="wrapper">
			<div id="page-container">
				<header id="nav-header">
					<div className="menu-navigation">
						<div className="nav-logo-btn">
							<Link href="/">
								<a>
									<img src="./images/long-logo.svg" height="30px"/>
								</a>
							</Link>
						</div>
						<div className="nav-link-btn">
							<Link href="/">
								<a>
									모집 중인 프로젝트
								</a>
							</Link>
						</div>
						<div className="nav-link-btn">
							<Link href="/">
								<a>
									어떠한 기능 버튼
								</a>
							</Link>
						</div>
						<button type="button" className="nav-profile-btn">
							<DummyProfile />
						</button>
					</div>
				</header>
				<main className="page-wrap">
					<div className="page-inner-container">
						{children}
					</div>
				</main>
				{ !openChat &&
					<button onClick={onClickChatBtn} type="button" className="chat-btn-container">
						<Chat />
					</button>
				}
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
			</div>
		</div>
	);
};

AppLayout.propTypes = {

};

export default AppLayout;
