import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Chat, Person, Assignment, ExitToApp, Notifications, Close, EmojiPeopleOutlined, WebOutlined } from '@material-ui/icons';

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
import NoSubProfile from './NoSubProfile';
import { Avatar } from '@material-ui/core';

export const DummyProfile = () => {
	return (
		<img src="https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg" />
	);
}

export const LoadingCircle = () => {
	return (
		<div className="loading-spinner"></div>
	);
}

const dummyNotif = [{
	class: 'chatting',
	chat: {
		roomIdx: 1,
		chatRoomName: 'hhan',
		mutichat: false,
		recentContent: {
			userId: 1,
			userName: 'hhan',
			content: '화이팅합시다.',
		}
	},
	proj: null,
	pool: null,
},{
	class: 'chatting',
	chat: {
		roomIdx: 1,
		chatRoomName: 'Rank42',
		mutichat: true,
		recentContent: {
			userId: 1,
			userName: 'hhan',
			content: '근본없는 Node.js는 당장 그만두고, 근본있는 Django를 씁시다.',
		}
	},
	proj: null,
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'accept',
	}
}];

const UserLoggedIn = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const { user } = useSelector(state=>state.user);

	const onClickLogoutBtn = useCallback((e) => {
		e.preventDefault();
		if (confirm('로그아웃 하시겠습니까?')) {
			dispatch({
				type: LOGOUT_REQUEST,
			})
		}
	})

	const openNotif = useCallback((e) => {
		setOpen(!open);
	}, [open])

	const openNotifStyle = {
		maxHeight: `${open ? 600 : 0}px`
	}

	return (
		<ul>
			<li>
				<Link href={`/user/${user.userId}`}>
					<a className="sub-menu-line">
						<Person /> Profile
					</a>
				</Link>
			</li>
			<li>
				<Link href="/">
					<a className="sub-menu-line">
						<Assignment />My Project
					</a>
				</Link>
			</li>
			<li>
				<div className="sub-menu-line" onClick={openNotif}>
					<Notifications />Notification
					{ dummyNotif.length !== 0 &&
						<div className="notification-circle">
							{dummyNotif.length}
						</div>
					}
				</div>
				<div className="notif-content-box" style={openNotifStyle}>
					{dummyNotif.map((c, i) => {
						if (c.class === 'chatting') {
							return (
								<div className="notif-content" key={(i)}>
									<div>
										<span>{c.chat.chatRoomName}</span>
										{!c.chat.mutichat ?
											<p>님과의 대화</p>
											:
											<p>단체방</p>
										}
										<span name="chat-content">{c.chat.recentContent.content}</span>
									</div>
								</div>
							)
						} else if (c.class === "project") {
							return (
								<div className="notif-content" key={(i)}>
									<Link href={`/project/${c.proj.projIdx}`}>
										<a>
											{c.proj.status === "accept" ?
											<><span>{c.proj.projectName}</span><p>프로젝트 참가 신청이 <b>수락</b>되었습니다.</p></>
										:
											<><span>{c.proj.projectName}</span><p>프로젝트에 <b>신청자</b>가 있습니다.</p></>
										}
										</a>
									</Link>
								</div>
							)
						}
					})}
				</div>
			</li>

			<li>
				<div className="sub-menu-line" onClick={onClickLogoutBtn}>
					<ExitToApp />Log out
				</div>
			</li>
		</ul>
	);
};

const NotifBox = ({ flg, setFlg, actionFunction }) => {
	const pushClass = flg ? 'new-notification occur' : 'new-notification';

	return (
		<div className={pushClass}>
			<div className="new-notif-box">
				<div className="notif-content" onClick={() => {console.log('click')}}>
					new notification
				</div>
				<div className="close-box" onClick={() => {console.log('close')}}>
					<Close/>
				</div>
			</div>
		</div>
	);
}

const UserLogin = ({ isLoggingIn, loginErrorReason}) => {
	const dispatch = useDispatch();

	const [email, OCEmail] = useInput('');
	const [password, OCPassword] = useInput('');

	const [notSubmitReason, setNotSubmitReason] = useState('');

	const onSubmitLogin = useCallback((e) => {
		e.preventDefault();

		dispatch({
			type: LOGIN_REQUEST,
			data: {
				email,
				password,
			}
		});
	})

	return (
		<div className="login-box">
			{ isLoggingIn && <div className="login-loading">
				<LoadingCircle />
			</div>}
			<p>
				{loginErrorReason === '' ? '로그인이 필요합니다.' : loginErrorReason}
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
		</div>
	)
}

const UserMenu = ({ user, isLoggingIn, openUserMenu, loginErrorReason }) => {
	const subMenuClass = openUserMenu ? "profile-sub-menu has-visibility" : "profile-sub-menu";

	return (
		<>
			<div className={subMenuClass} >
				{ user ?
					<UserLoggedIn />
					:
					<UserLogin isLoggingIn={isLoggingIn} loginErrorReason={loginErrorReason}/>
				}
			</div>
		</>
	)
}

const AppLayout = ({ children }) => {
	const { openChat, openUserMenu, openApply, openSubProfile } = useSelector(state=>state.component);
	const { user, isLoggingIn, loginErrorReason } = useSelector(state=>state.user);

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

	const [toggleMenu, setToggle] = useState(false);

	const toggleFunc = useCallback((e) => {
		e.preventDefault();
		setToggle(!toggleMenu);
	}, [toggleMenu]);

	const [togglePJ, setTogglePJ] = useState(false);
	const [toggleJW, setToggleJW] = useState(false);

	return (
		<div id="wrapper">
			<div id="page-container">
			<header id="nav-header">
					<div className="menu-navigation">
						<div className="nav-logo-btn">
							<Link href="/"><a>
								<img src="/images/logo.png" height="30px"/>
								<h1>GOODTEAM</h1>
							</a></Link>
						</div>
						<div className="menu-btn" onClick={() => {
							setToggleJW(false);
							setTogglePJ(!togglePJ);
							}}>
							<WebOutlined /><span>프로젝트</span>
							<div className="menu-box" style={{maxHeight: `${togglePJ ? 140 : 0}px`}}>
								<Link href="/project"><a className="menu-btn child">찾아보기</a></Link>
								<Link href="/project/write"><a className="menu-btn child">모집하기</a></Link>
							</div>
						</div>
						<div className="menu-btn" onClick={() => {
							setTogglePJ(false);
							setToggleJW(!toggleJW)
							}}>
							<EmojiPeopleOutlined /><span>인재풀</span>
							<div className="menu-box" style={{maxHeight: `${toggleJW ? 140 : 0}px`}}>
								<Link href="/jewel"><a className="menu-btn child">찾아보기</a></Link>
								<Link href="/jewel/write"><a className="menu-btn child">모집하기</a></Link>
							</div>
						</div>
						<div className="nav-profile-btn" onClick={onClickProfileBtn}>
							{ user ?
								<div>
									{user.profileImg ?
										<img src={user.profileImg} />
									:
										<Avatar className="profile-img" style={{background: 'linear-gradient(#7990ff, #9198e5)'}}>{user.userName[0]}</Avatar>
									}
									{ dummyNotif && <div className="notification-circle"></div> }
								</div> :
								<img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b7c76929274393.55ead42cd721c.jpg"/>
							}
						</div>
						<UserMenu user={user} isLoggingIn={isLoggingIn} openUserMenu={openUserMenu} loginErrorReason={loginErrorReason}/>
					</div>
				</header>
				<main className="page-wrap">
					<div className="page-inner-container">
						{children}
					</div>
				</main>
				<footer id="footer" role="contentinfo">
					<div className="footer-section">
						<div className="widget">
							<h2>
								han
							</h2>
							<div className="content">
								<ul>
									<li>
										<span className="left">Company</span>
										<span className="right">42Seoul</span>
									</li>
									<li>
										<span className="left">Position</span>
										<span className="right">Design and FrontEnd</span>
									</li>
									<li>
										<span className="left">Email</span>
										<span className="right">anhs0220@gmail.com</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="widget">
							<h2>
								yshim
							</h2>
							<div className="content">
								<ul>
									<li>
										<span className="left">Company</span>
										<span className="right">42Seoul</span>
									</li>
									<li>
										<span className="left">Position</span>
										<span className="right">BackEnd</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</footer>
				{
					openApply && <Curtain component={<RequestMember />} />
				}
				{ (!openChat && user ) &&
					<button onClick={onClickChatBtn} type="button" className="chat-btn-container">
						<Chat />
					</button>
				}
				{ user && <ChatComponent openChatComponent={openChatComponent} onClickChatBtn={onClickChatBtn}/> }
				{ <NotifBox />}
				{ (user && openSubProfile) && <Curtain component={<NoSubProfile />} />}
			</div>
		</div>
	);
};

AppLayout.propTypes = {

};

export default AppLayout;
