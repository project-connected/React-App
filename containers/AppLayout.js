import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Chat } from '@material-ui/icons';

// reducer
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_CHAT, OPEN_CHAT, OPEN_USER_MENU, CLOSE_USER_MENU } from '../reducers/component';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../reducers/user';

// customs
import ChatComponent from '../components/chat/ChatComponent';
import RequestMember from '../components/forms/RequestMember';

// custom hooks
import useInput from '../hooks/useInput';
import Curtain from './Curtain';

export const DummyProfile = () => {
	return (
		<img src="https://media.vlpt.us/images/yujo/profile/053c9bee-1076-418c-808d-f9a1b88dc445/KakaoTalk_20200229_162658088.jpg?w=240" />
	);
}

export const LoadingCircle = () => {
	return (
		<div className="loading-spinner"></div>
	);
}

const UserLoggedIn = () => {
	const dispatch = useDispatch();

	const onClickLogoutBtn = useCallback((e) => {
		e.preventDefault();
		if (confirm('로그아웃 하시겠습니까?')) {
			dispatch({
				type: LOGOUT_REQUEST,
			})
		}
	})

	return (
		<ul>
			<li>
				<Link href="/profile">
					<a>
						Profile
					</a>
				</Link>
			</li>
			<li>
				<Link href="/">
					<a>
						My Project
					</a>
				</Link>
			</li>
			<li>
				<button onClick={onClickLogoutBtn}>
					<a>
						Log out
					</a>
				</button>
			</li>
		</ul>
	);
};

const UserLogin = ({ isLoggingIn }) => {
	const dispatch = useDispatch();

	const [email, OCEmail] = useInput('');
	const [password, OCPassword] = useInput('');

	const [notSubmitReason, setNotSubmitReason] = useState('');


	const onSubmitLogin = useCallback((e) => {
		e.preventDefault();

		dispatch({
			type: LOGIN_REQUEST,
		});
	})

	return (
		<>
			{ isLoggingIn && <div className="login-loading">
				<LoadingCircle />
			</div>}
			<p>
				로그인이 필요합니다.
			</p>
			<form onSubmit={onSubmitLogin}>
				<div className="login-ipt-box">
					<input
						type="email"
						name="email"
						onChange={OCEmail}
						placeholder="Email"
						autoComplete="username"
						required
					/>
				</div>
				<div className="login-ipt-box">
					<input
						type="password"
						name="password"
						onChange={OCPassword}
						placeholder="Password"
						autoComplete="current-password"
						required
					/>
				</div>
				<input type="submit" value="LOGIN"/>
			</form>
			<div className="link-comment">
				<p>아직 회원이 아니신가요? </p>
				<Link href="/signup">
					<a>
						SIGN UP
					</a>
				</Link>
			</div>
		</>
	)
}

const UserMenu = ({ user, isLoggingIn, openUserMenu }) => {
	const subMenuClass = openUserMenu ? "profile-sub-menu has-visibility" : "profile-sub-menu";

	return (
		<>
			<div className={subMenuClass} >
				{ user ?
					<UserLoggedIn />
					:
					<UserLogin isLoggingIn={isLoggingIn} />
				}
			</div>
		</>
	)
}

const AppLayout = ({ children }) => {
	const { openChat, openUserMenu, openApply } = useSelector(state=>state.component);
	const { user, isLoggingIn } = useSelector(state=>state.user);

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

	const onClickProfileBtn = useCallback((e) => {
		e.preventDefault();
		if (!openUserMenu) {
			dispatch({
				type: OPEN_USER_MENU,
			})
		} else {
			dispatch({
				type: CLOSE_USER_MENU,
			})
		}
	})

	return (
		<div id="wrapper">
			<div id="page-container">
				<header id="nav-header">
					<div className="menu-navigation">
						<div className="nav-logo-btn">
							<Link href="/">
								<a>
									<img src="http://connected.anjoy.info/images/long-logo.svg" height="30px"/>
								</a>
							</Link>
						</div>
						<div className="nav-link-btn">
							<Link href="/project">
								<a>
									모집 중인 프로젝트
								</a>
							</Link>
						</div>
						<div className="nav-link-btn">
							<Link href="/project/create">
								<a>
									프로젝트 만들기
								</a>
							</Link>
						</div>
						<div type="button" className="nav-profile-btn" onClick={onClickProfileBtn}>
							{ user ?
								<DummyProfile /> :
								<img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b7c76929274393.55ead42cd721c.jpg"/>
							}
						</div>
						<UserMenu user={user} isLoggingIn={isLoggingIn} openUserMenu={openUserMenu}/>
					</div>
				</header>
				<main className="page-wrap">
					<div className="page-inner-container">
						{children}
					</div>
				</main>
				{
					openApply && <Curtain component={<RequestMember />} />
				}
				{ (!openChat && user ) &&
					<button onClick={onClickChatBtn} type="button" className="chat-btn-container">
						<Chat />
					</button>
				}
				{ user && <ChatComponent openChatComponent={openChatComponent} onClickChatBtn={onClickChatBtn}/> }
			</div>
		</div>
	);
};

AppLayout.propTypes = {

};

export default AppLayout;
