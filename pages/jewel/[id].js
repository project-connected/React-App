import React from 'react';

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import { LOAD_JEWEL_REQUEST } from '../../reducers/jewel';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';
import { LOAD_USER_REQUEST } from '../../reducers/user';

import JewelDetail from '../../components/JewelDetail';

const JewelPage = props => {
	const { jewelData } = useSelector(state=>state.jewel);

	return (
		<div className="jewel-page-box">
			<JewelDetail
				mode="page"
				jewelData={jewelData}
				open={true}
			/>
		</div>
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
	context.store.dispatch({
		type: LOAD_COMMON_REQUEST,
	})
	if (context.params.id !== 'undefined') {
		context.store.dispatch({
			type: LOAD_JEWEL_REQUEST,
			id: context.params.id
		})
	}
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});


export default JewelPage;
