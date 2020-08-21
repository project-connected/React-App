import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { useSelector } from 'react-redux';
import { VpnKey, CameraAlt } from '@material-ui/icons';

import useInput from '../hooks/useInput';

const Profile = () => {
	const { user } = useSelector(state=>state.user);

	const [name, OCName] = useInput(user ? user.name : '');
	const [password, OCPassword] = useInput('');
	const [newPW, OCNewPW] = useInput('');
	const [checkNewPW, OCCheckNewPW] = useInput('');

	const imageInput = useRef();

	const changePWRequest = useCallback((e) => {
		e.preventDefault();
		if (newPW !== checkNewPW) {
			alert('비밀번호가 일치하지 않아요');
			return ;
		}
	}, [password, newPW, checkNewPW]);

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	useEffect(() => {
		if (!user) {
			alert('로그인이 필요합니다.');
			Router.push("/");
		}
	}, [])

	return (
		<>
		{user &&
		<div id="myProfile">
			<div className="main-info">
				<div className="profile-img">
					<div style={{backgroundImage: `url(${user && user.profileImg})`}}>
						<button onClick={onClickImageUpload}>
							<CameraAlt style={{color: 'white'}}/>
						</button>
						<input type="file" ref={imageInput} />
					</div>
				</div>
				<div className="login-info">
					<div name="email">{user.email}</div>
					<div name="name">{user.name}</div>
					<div name="change-pwd"><VpnKey/>비밀번호 변경하기</div>
				</div>
			</div>
			<div className="info-line">
				<h3>  Info</h3>
				<div className="line"></div>
			</div>
			<div className="profile-form">
				<div>
					<p>nickname</p>
					<input type="text" placeholder="닉네임"/>
				</div>
				<div>
					<p>URL</p>
					<input type="text" placeholder="url"/>
				</div>
				<div>
					<p>스택</p>
				</div>
				<div>
					<p>자기소개</p>
				</div>
			</div>
		</div>
		}
		</>
	);
};

Profile.propTypes = {

};

export default Profile;

// 지역
// 가능 스택
// 프로필 이미지 (선택)
// 블로그, 깃 등의 링크
// 자기 소개

