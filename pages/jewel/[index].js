import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../../store/configureStore';

import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

const Jeweler = props => {
	const { jewelData } = useSelector(state=>state.jewel);
	const dispatch = useDispatch();

	return (
		<div id="profile-wrap">
			<div className="profile-box left">
				<img className="profile-img boxShadow" src={jewelData.user.profileImg} />
				<Link href={`/user/${jewelData.user.userId}`}>
					<a className="user-name">
						@<b>{jewelData.user.userName}</b>
						<div className="sub-information">
							프로필 보기
						</div>
					</a>
				</Link>
				<div className="jewel-period">
					<p>{jewelData.user.userName}님의 희망 기간</p>
					<div className="date">{moment(new Date()).format('YY년 MM월 DD일')}</div>
					<div className="period-line" />
					<div className="date">{moment(new Date().setDate(31)).format('YY년 MM월 DD일')}</div>
				</div>
				<div className="info-box">
					<p>{jewelData.user.userName}님의 희망 지역</p>
					<div>{jewelData.region.value}</div>
				</div>
				<div className="info-box">
					<p>{jewelData.user.userName}님의 희망 테마</p>
					<div>{jewelData.theme.value}</div>
				</div>
				<div className="info-box">
					<p>{jewelData.user.userName}님의 희망 결과물</p>
					<div>{jewelData.result.value}</div>
				</div>
				<div className="info-box">
					<p>{jewelData.user.userName}님의 스택</p>
					<div className="multi-content profile">
						{jewelData.stacks.map((c, i) => {
							return (
								<div className="jewel-card-stack">
									{c.value}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="profile-box right">
				에디터로 입력한 정보
			</div>
		</div>
	);
};

Jeweler.propTypes = {

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

export default Jeweler;
