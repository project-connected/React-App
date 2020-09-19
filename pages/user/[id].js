import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { EmailOutlined, ChatOutlined, CreateOutlined } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown'

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../../store/configureStore';

import { JewelDetail } from '../jewel';

import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

const User = props => {
	const { other, user } = useSelector(state=>state.user);
	const dispatch = useDispatch();

	const [viewIdx, setViewIdx] = useState(1);

	const clickViewBtn = useCallback((idx) => (e) => {
		e.preventDefault();
		setViewIdx(idx);
	}, [])

	const slideStyle = {
		transform: `translateX(${(viewIdx-1) * 100 * -1}%)`
	}

	return (
		<div id="profile-wrap">
			<div className="profile-box left">
				<img className="profile-img boxShadow" src={other.profileImg} />
				<div className="user-name">
					<b>{other.userName}</b>
				</div>
				<div className="info-line">
					<EmailOutlined />
					{other.email}
				</div>
				<div className="chat-btn">
					{user.userId === other.userId ?
					<Link href={`/user/edit`}>
						<a>
							<CreateOutlined />
							수정하기
						</a>
					</Link>
					:
					<>
						<ChatOutlined />
						채팅하기
					</>
					}
				</div>
			</div>
			<div className="profile-box right">
				<div className="detail-profile-header">
					<div className={viewIdx == 1 ? "detail-profile-btn clicked boxShadow" : "detail-profile-btn boxShadow"}  onClick={clickViewBtn(1)}>
						정보
					</div>
					<div className={viewIdx == 2 ? "detail-profile-btn clicked boxShadow" : "detail-profile-btn boxShadow"}  onClick={clickViewBtn(2)}>
						프로젝트
					</div>
					<div className={viewIdx == 3 ? "detail-profile-btn clicked boxShadow" : "detail-profile-btn boxShadow"}  onClick={clickViewBtn(3)}>
						인재풀
					</div>
				</div>
				<div className="detail-profile-wrap boxShadow">
					<div className="detail-profile-box">
						<div style={slideStyle} className="detail-profile">
							{!other.subProfile ?
								<div className="empty-info">
									해당 사용자는 아직 추가 정보를 등록하지 않았어요.
								</div>
							:
								<>
								<div className="subProfile-wrap">
									<div className="subProfile-box mult">
										<div>
											<h3 className="title">
												REGION
											</h3>
											<span>{other.subProfile.region}</span>
										</div>
										<div>
											<h3 className="title">
												URL
											</h3>
											<span>
												<a href={other.subProfile.url} target="_blank">
													{other.subProfile.url}
												</a>
											</span>
										</div>
									</div>
									<div className="subProfile-box">
										<h3 className="title">
											STACK
										</h3>
										<div className="block-content-wrap stack">
											{other.subProfile.stacks.map((c, i) => {
												return (
													<div className="block-content stack boxShadow" key={(i)} style={{background: `${c.color}`}}>
														{c.value}
													</div>
												);
											})}
										</div>
									</div>
									<div className="subProfile-box">
										<h3 className="title">
											THEME
										</h3>
										<div className="block-content-wrap">
											{other.subProfile.theme.map((c, i) => {
												return (
													<div className="block-content string" key={(i)}>
														{c.value}
													</div>
												)
											})}
										</div>
									</div>
									<div className="subProfile-box">
										<h3 className="title">
											DEST
										</h3>
										<div className="block-content-wrap">
										{other.subProfile.result.map((c, i) => {
												return (
													<div className="block-content string" key={(i)}>
														{c.value}
													</div>
												)
											})}
										</div>
									</div>
								</div>
								<div className="subProfile-box">
									<h3 className="title">
										INTRODUCT
									</h3>
									<div className="block-content-wrap introduct">
										<ReactMarkdown source={other.subProfile.introduct} />
									</div>
								</div>
								</>
							}
						</div>
						<div style={slideStyle} className="detail-profile">
							two
						</div>
						<div style={slideStyle} className="detail-profile jewel">
							{other.jewelData ?
								<JewelDetail open={true} mode="page" jewelData={other.jewelData} />
								:
								<div className="empty-info">
									해당 사용자는 현재 인재풀에 등록한 정보가 없어요.
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

User.propTypes = {

};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
	})
	context.store.dispatch({
		type: LOAD_COMMON_REQUEST,
	})
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default User;
