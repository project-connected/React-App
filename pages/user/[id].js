import React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../../store/configureStore';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

const Profile = dynamic(
	import('../../containers/pagesComponent/user/Profile'),
	{
		loading: () => <LoadingBox />,
	},
);

const User = () => {
	return <Profile />;
};

User.propTypes = {};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
		});
		context.store.dispatch({
			type: LOAD_COMMON_REQUEST,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	},
);

export default User;
