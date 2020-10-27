import React from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';

import { LoadingBox } from '../../components/LoadingCircles';

import { LOAD_COMMON_REQUEST } from '../../reducers/common';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_JEWEL_LIST_REQUEST } from '../../reducers/jewel';
import Head from 'next/head';

const SearchJewelPage = dynamic(
	import('../../containers/pagesComponent/jewel/SearchJewelPage'),
	{
		loading: () => <LoadingBox />,
	},
);

const FindJewel = () => {
	return (
		<>
			<Head>
				<title>인재 검색</title>
			</Head>
			<SearchJewelPage />
		</>
	);
};

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
		// context.store.dispatch({
		// 	type: LOAD_JEWEL_LIST_REQUEST,
		// });
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	},
);

export default FindJewel;
