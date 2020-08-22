import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { useSelector } from 'react-redux';
import { VpnKey, CameraAlt } from '@material-ui/icons';

import useInput from '../hooks/useInput';
import SelectAttr from '../components/buttons/SelectAttr';

import { Editor } from './project/create';

const Profile = () => {
	const { user } = useSelector(state=>state.user);

	const [name, OCName] = useInput(user ? user.name : '');
	const [url, OCUrl] = useInput(user ? user.subProfile.url : '');
	const [region, setRegion] = useState(user ? (user.region ? user.region : '지역') : '');
	const [stacks, setStacks] = useState(user ? user.subProfile.stacks : []);
	const [intro, setIntro] = useState(user ? user.subProfile.introduct : '' );

	const imageInput = useRef();

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
				<div className="profile-attr">
					<p className="title">nickname</p>
					<input value={name} onChange={OCName} type="text" placeholder="닉네임"/>
				</div>
				<div className="profile-attr">
					<p className="title">URL</p>
					<input value={url} onChange={OCUrl} type="text" placeholder="url"/>
				</div>
				<div className="profile-attr">
					<p className="title">Region</p>
					<SelectAttr idx={8} getAction={setRegion} name={region} data={["서울", "대전", "대구", "부산", "찍고", "아하"]} status="profile" />
				</div>
				<div className="profile-attr">
					<p className="title">스택</p>
				</div>
				<div className="profile-attr">
					<p className="title">자기소개</p>
					<Editor editorValue={intro} OCV={setIntro}/>
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

