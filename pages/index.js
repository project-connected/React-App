import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import CountUp from 'react-countup';

import { LOAD_USER_REQUEST } from '../reducers/user';

const Index = () => {
	return (
		<>
		<div id="main-header">
			헤더 메세지
		</div>
		<div id="main-page">
			카드들
		</div>
		</>
	);
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
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Index;
