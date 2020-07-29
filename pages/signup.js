import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'

import { useSelector, useDispatch } from 'react-redux';
import { SIGNUP_REQUEST } from '../reducers/user';

import useInput from '../hooks/useInput';

const Signup = () => {
	const dispatch = useDispatch();
	const { user, isSignedup } = useSelector(state=>state.user);

	const [name, OCName] = useInput('');
	const [email, OCEmail] = useInput('');
	const [pw, OCPw] = useInput('');
	const [rePw, OCRePw] = useInput('');

	const [togglePw, setTogglePw] = useState(true);
	const [term, setTerm] = useState(false);

	const checkedTerm = useCallback((e) => {
		setTerm(e.target.checked);
	}, [term])

	useEffect(() => {
		if (user) {
			alert('메인페이지로 이동합니다.');
			Router.push('/');
		}
		if (isSignedup) {
			alert('회원가입되었어요.');
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
					name: name,
					password: pw,
					term: term
				}
			})
		}
	})

	return (
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
							type="text"
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
	);
};

Signup.propTypes = {

};

export default Signup;
