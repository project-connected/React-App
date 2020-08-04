import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { useSelector } from 'react-redux';
import { InsertPhoto, Email, PersonPin, VpnKey } from '@material-ui/icons';

const Profile = () => {
	const { user } = useSelector(state=>state.user);

	const imageInput = useRef();

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
					<div style={{background: `url(${user.profileImg}) 50% 50% no-repeat`}}>
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
						{user.name}
					</div>
					<div>
						<VpnKey />
						비밀번호 변경하기
					</div>
				</div>
			</div>
			<div className="sub-info">
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

