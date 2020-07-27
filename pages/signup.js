import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'

import { useSelector } from 'react-redux';

import useInput from '../hooks/useInput';

const Signup = () => {
	const { user } = useSelector(state=>state.user);

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
	}, [user]);

	useEffect(() => {
		if (pw !== '' && rePw !== '') {
			if (pw !== rePw) {
				setTogglePw(false);
			} else {
				setTogglePw(true);
			}
		}
	}, [pw, rePw, togglePw])

	useEffect(() => {
		console.log(term);
	}, [term]);

	return (
		<div id="signup-wrap">
			<div className="signup-container">
				<form>
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
					<input
						type="submit"
						value="Create Account"
					/>
					{!togglePw && <p>비밀번호가 일치하지 않습니다.</p> }
				</form>
			</div>
		</div>
	);
};

Signup.propTypes = {

};

export default Signup;
