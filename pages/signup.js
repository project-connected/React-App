import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Head from 'next/head';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../store/configureStore';
import { SIGNUP_REQUEST, RESET_DONE_FLAG, LOAD_USER_REQUEST } from '../reducers/user';

import useInput from '../hooks/useInput';
import { CLOSE_USER_MENU } from '../reducers/component';
import { LOAD_COMMON_REQUEST } from '../reducers/common';

const Signup = () => {
	const dispatch = useDispatch();
	const { user, isSignedup } = useSelector(state=>state.user);

	const [name, OCName] = useInput('');
	const [email, OCEmail] = useInput('');
	const [pw, OCPw] = useInput('');
	const [rePw, OCRePw] = useInput('');

	const [togglePw, setTogglePw] = useState(true);
	const [term, setTerm] = useState(false);

	useEffect(() => {
		dispatch({
			type: LOAD_USER_REQUEST,
		})
	}, []);

	const checkedTerm = useCallback((e) => {
		setTerm(e.target.checked);
	}, [term])

	useEffect(() => {
		dispatch({ type: CLOSE_USER_MENU });
		if (user) {
			alert('메인페이지로 이동합니다.');
			dispatch({ type: RESET_DONE_FLAG });
			Router.push('/');
		}
		if (isSignedup) {
			alert('회원가입되었어요.');
			dispatch({ type: RESET_DONE_FLAG });
			Router.push('/');
		}
	}, [user, isSignedup]);

	useEffect(() => {
		if (pw !== '' && rePw !== '') {
			if (pw !== rePw) {
				setTogglePw(false);
			} else {
				setTogglePw(true);
			}
		} else {
			setTogglePw(true);
		}
	}, [pw, rePw, togglePw])

	const submitSignup = useCallback((e) => {
		e.preventDefault();
		if (!term) {
			alert('약관에 동의해주세요.');
			return ;
		}
		if (confirm('입력한 정보로 회원가입하실거에용?')) {
			dispatch({
				type: SIGNUP_REQUEST,
				data: {
					email: email,
					userName: name,
					password: pw,
				}
			})
		}
	})

	return (
		<>
		<Head>
			<title>회원가입</title>
		</Head>
		<div id="signup-wrap">
			<div className="signup-container">
				<form onSubmit={submitSignup}>
					<h4>Sign up</h4>
					<div className="signup-ipt-box">
						<input
							type="text"
							placeholder="Name"
							autoComplete="username"
							onChange={OCName}
							name="name"
							required
						/>
					</div>
					<div className="signup-ipt-box">
						<input
							type="email"
							placeholder="Email"
							autoComplete="username"
							onChange={OCEmail}
							name="email"
							required
						/>
					</div>
					<div className="signup-ipt-box">
						<input
							type="password"
							placeholder="Password"
							autoComplete="current-password"
							onChange={OCPw}
							name="pw"
							required
						/>
					</div>
					<div className="signup-ipt-box">
						<input
							type="password"
							placeholder="Re-enter Password"
							autoComplete="current-password"
							onChange={OCRePw}
							name="rePw"
							required
						/>
					</div>
					<div className="signup-ipt-box check-policy">
						<input type="checkbox" name="policy" checked={term} onChange={checkedTerm}/>
						<span>
							Are you agree to our term, policy?
						</span>
					</div>
					<div className="contain-toggle-message">
						{ !togglePw && <p>비밀번호가 일치하지 않습니다.</p> }
						<input
							type="submit"
							value="Create Account"
						/>
					</div>
				</form>
			</div>
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
	context.store.dispatch({
		type: LOAD_COMMON_REQUEST,
	})
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Signup;
