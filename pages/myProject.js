import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import wrapper from '../store/configureStore';
import axios from 'axios';
import {useDispatch} from 'react-redux';

import { END } from 'redux-saga';
import { LOAD_USER_REQUEST } from '../reducers/user';

const MyProject = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: LOAD_USER_REQUEST,
		})
	}, []);
	return (
		<div>
			<div>
				<section>
					모집 중인 프로젝트
				</section>
				<section>
					지원 신청한 프로젝트
				</section>
			</div>
			<div>
				진행 중인 프로젝트
			</div>
			<div>
				완료 프로젝트
			</div>
		</div>
	);
};

MyProject.propTypes = {

};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
		// axios.defaults.headers.auauthorization = localStorage.getItem('userToken');
	}
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
	})
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default MyProject;
