import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { useSelector } from 'react-redux';
import { InsertPhoto, Email, PersonPin, VpnKey } from '@material-ui/icons';

import useInput from '../hooks/useInput';

const Profile = () => {
	const { user } = useSelector(state=>state.user);

	const [name, OCName] = useInput(user.name);
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

	useEffect(() => {
		if (!user) {
			alert('로그인이 필요합니다.');
			Router.push("/");
		}
	}, [])

	return (
		<form id="myProfile">
			<div className="default-info">
				<div role="region" id="img-section">
					<div style={{background: `url(${user.profileImg}) `}}>
						<button >
							<InsertPhoto style={{color: 'white'}}/>
							<p>이미지 변경하기</p>
						</button>
						<input type="file" ref={imageInput} />
					</div>
				</div>
				<div role="region" id="info-section">
					<div>
						<Email />
						{user.email}
					</div>
					<div>
						<PersonPin />
						<input type="text" value={name} onChange={OCName} />
					</div>
					<div className="change-pwd-container">
						<VpnKey />
						<input type="password" value={password} onChange={OCPassword} placeholder="비밀번호를 입력하세요"/>
						<input type="password" value={newPW} onChange={OCNewPW} placeholder="새로운 비밀번호를 입력하세요"/>
						<input type="password" value={checkNewPW} onChange={OCCheckNewPW} placeholder="새로운 비밀번호를 한번더 입력하세요"/>
						<button onClick={changePWRequest}>
							비밀번호 변경하기
						</button>
					</div>
				</div>
			</div>
			<div className="info-section">
				<div>
					지역
				</div>
				<div>
					가능 스택
				</div>
				<div>
					블로그, 깃 등의 링크
				</div>
				<div>
					자기소개
				</div>
			</div>
			<input type="submit" value="수정하기"/>
		</form>
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

