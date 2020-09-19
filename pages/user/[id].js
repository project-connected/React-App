import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { EmailOutlined, ChatOutlined } from '@material-ui/icons';

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../../store/configureStore';

import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

const User = props => {
	const { other } = useSelector(state=>state.user);
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
					<ChatOutlined />
					채팅하기
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
								<div className="subProfile-box">
									지역, url, 테마,
									결과물, 스택,
									text
								</div>
							}
						</div>
						<div style={slideStyle} className="detail-profile">
							two
						</div>
						<div style={slideStyle} className="detail-profile">
							three
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
