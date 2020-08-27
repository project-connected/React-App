import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { LOAD_USER_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';

const User = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: LOAD_USER_REQUEST,
		})
	}, []);
	return (
		<div>

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
		// axios.defaults.headers.auauthorization = localStorage.getItem('userToken');
	}
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
	})
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default User;
