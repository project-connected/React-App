import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Chat, Person, Assignment, ExitToApp, Notifications, Close } from '@material-ui/icons';

// reducer
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_CHAT, OPEN_CHAT, OPEN_USER_MENU, CLOSE_USER_MENU, CLOSE_ALL_COMP1 } from '../reducers/component';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../reducers/user';
import { CLOSE_ALL_COMP2 } from '../reducers/project';

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
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
},{
	class: 'project',
	chat: null,
	proj: {
		projIdx: 1,
		projectName: 'Rank42',
		status: 'apply',
	},
	pool: null,
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
				<Link href={`/profile`}>
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
				<button onClick={onClickLogoutBtn}>
					<a className="sub-menu-line">
						<ExitToApp />Log out
					</a>
				</button>
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

const UserLogin = ({ isLoggingIn }) => {
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
		</div>
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
									<img src="/images/logo.png" height="30px"/>
									<h1>GOODTEAM</h1>
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
						{user && <>
							<div className="nav-link-btn">
								<Link href="/project/create">
									<a>
										프로젝트 만들기
									</a>
								</Link>
							</div>
							<div className="nav-link-btn">
								<Link href="/jewel/new">
									<a>
										인재풀 등록하기
									</a>
								</Link>
							</div>
							<div className="nav-link-btn">
								<Link href="/jewel">
									<a>
										인재 살펴보기
									</a>
								</Link>
							</div>
						</>
						}
						<div type="button" className="nav-profile-btn" onClick={onClickProfileBtn}>
							{ user ?
								<div>
									<DummyProfile />
									{ dummyNotif && <div className="notification-circle"></div> }
								</div> :
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
				{ <NotifBox />}
			</div>
		</div>
	);
};

AppLayout.propTypes = {

};

export default AppLayout;
