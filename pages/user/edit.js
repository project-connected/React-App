import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { VpnKey, CameraAlt } from '@material-ui/icons';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import useInput from '../../hooks/useInput';
import useInputWithSetter from '../../hooks/useInputWithSetter';

import { Editor } from '../project/create';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

import SelectBlock from '../../components/buttons/SelectBlock';

const ChangePassword = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const newRef = useRef();
	const checkRef = useRef();

	const [pw, setPW ,OCPW] = useInputWithSetter('');
	const [newPW, setNewPW, OCNewPW] = useInputWithSetter('');
	const [checkNewPW, setCheckNewPW, OCCheckNewPW] = useInputWithSetter('');
	const [error, setError] = useState(false);

	const [idx, setIdx] = useState(0);

	useEffect(() => {
		if (open) {
			setIdx(1);
		} else {
			setIdx(0);
			setPW('');
			setNewPW('');
			setCheckNewPW('');
		}
	}, [open]);

	const backgroundClass = open ? "back-btn visible" : "back-btn hide";

	const closeComponent = useCallback((e) => {
		e.preventDefault();
		setOpen(false);
	}, []);

	const checkPW = useCallback((e) => {
		e.preventDefault();
		// dispatch({
		// 	type: CHECK_PASSWORD,
		// 	data: pw
		// })
		console.log('check pw');
		setIdx(2);
	}, [pw])

	const changePWRequest = useCallback((e) => {
		e.preventDefault();
		if (newPW.length < 6 || newPW !== checkNewPW) {
			setError(true)
			return ;
		} else {
			setError(false)
		}

		// dispatch({
		// 	type: CHANGE_PASSWORD_REQUEST,
		// 	data: {
		// 		new_password: newPW,
		// 	}
		// })
		if (confirm('비밀번호를 변경하시겠습니까?')) {
			console.log('enter new pw');
			setOpen(false);
		}
	}, [newPW, checkNewPW])

	return (
		<>
			<div className={backgroundClass} onClick={closeComponent} />
			{idx === 1 &&
				<div className="pw-change-box boxShadow">
					<p>비밀번호를 입력해주세요.</p>
					<input
						name="pw"
						placeholder="password"
						value={pw}
						onChange={OCPW}
						type="password"
						onKeyPress={(e) => {
							console.log(e.key);
							if(e.key === 'Enter') {
								checkPW(e);
							}
							if(e.key == 48){
								setOpen(false);
							}
						}}
						autoFocus
					/>
				</div>
			}
			{idx >= 2 &&
				<div className="pw-change-box boxShadow">
					<p>변경하실 비밀번호를 입력해주세요.</p>
					<input
						name="pw"
						placeholder="new password"
						type="password"
						value={newPW}
						onChange={OCNewPW}
						onKeyPress={(e) => {
							if(e.key === 'Enter') {
								setIdx(3);
								checkRef.current.focus()
							}
							if(e.key == 48){
								setOpen(false);
							}
						}}
						autoFocus
					/>
					<input
						ref={checkRef}
						name="pw"
						placeholder="enter new password again"
						type="password"
						value={checkNewPW}
						onChange={OCCheckNewPW}
						onKeyPress={(e) => {
							if(e.key === 'Enter') {
								changePWRequest(e);
							}
							if(e.key == 48){
								setOpen(false);
							}
						}}
					/>
					{error && <p style={{color: "#ff3333"}}>비밀번호를 다시 확인해주세요.</p> }
				</div>
			}
		</>
	)
}

const Profile = () => {
	const { user } = useSelector(state=>state.user);
	const { skills, themes, region, results} = useSelector(state=>state.common);

	const [name, OCName] = useInput(user ? user.userName : '');
	const [url, OCUrl] = useInput((user && user.subProfile) ? user.subProfile.url : '등록된 URL이 없습니다.');
	const [userRegion, setUserRegion] = useState((user && user.subProfile) ? (user.subProfile.region ? user.subProfile.region : {key: "DEFAULT", value: '지역'}) : '설정된 지역이 없습니다.');
	const [userStacks, setUserStacks] = useState((user && user.subProfile) ? user.subProfile.stacks : []);
	const [userThemes, setUserThemes] = useState((user && user.subProfile) ? user.subProfile.theme : []);
	const [userProducts, setUserProducts] = useState((user && user.subProfile) ? user.subProfile.result : []);
	const [intro, setIntro] = useState((user && user.subProfile) ? user.subProfile.introduct : '# test' );

	const [changePWOpen, setChangePWOpen] = useState(false);

	const imageInput = useRef();

	const dispatch = useDispatch();

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const getStacks = useCallback((stack) => {
		setUserStacks([...userStacks, stack]);
	}, [userStacks]);

	const removeStacks = useCallback((stack) => (e) => {
		e.preventDefault();
		setUserStacks(userStacks.filter(v => v.key !== stack.key));
	}, [userStacks]);

	const getThemes = useCallback((theme) => {
		setUserThemes([...userThemes, theme]);
	}, [userThemes]);

	const removeThemes = useCallback((theme) => (e) => {
		e.preventDefault();
		setUserThemes(userThemes.filter(v => v.key !== theme.key));
	}, [userThemes]);

	const getProducts = useCallback((product) => {
		setUserProducts([...userProducts, product]);
	}, [userProducts]);

	const removeProducts = useCallback((product) => (e) => {
		e.preventDefault();
		setUserProducts(userProducts.filter(v => v.key !== product.key));
	}, [userProducts]);

	useEffect(() => {
		if(!user) {
			alert('로그인을 해주세요.')
			Router.push('/')
		}
	}, [user])

	return (
		<>
		{user &&
		<div id="myProfile" >
			<ChangePassword open={changePWOpen} setOpen={setChangePWOpen}/>
			<div className="main-info">
				<div className="profile-img">
					<div style={{backgroundImage: `url(${user && (user.profileImg ? user.profileImg : 'data:image/jpeg;base64,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')})`}}>
						<button onClick={onClickImageUpload}>
							<CameraAlt style={{color: 'white'}}/>
						</button>
						<input type="file" ref={imageInput} />
					</div>
				</div>
				<div className="login-info">
					<div name="email">{user.email}</div>
					<div name="name">{user.userName}</div>
					<div name="change-pwd" onClick={(e) => {
						e.preventDefault();
						setChangePWOpen(true)
					}}><VpnKey/>비밀번호 변경하기</div>
				</div>
			</div>
			<div className="info-line">
				<h3>  Info</h3>
				<div className="line"></div>
			</div>
			<div className="profile-form">
				<div className="profile-attr">
					<p className="title">NICKNAME</p>
					<input value={name} onChange={OCName} type="text" placeholder="닉네임"/>
				</div>
				<div className="profile-attr">
					<p className="title">URL</p>
					<input value={url} onChange={OCUrl} type="text" placeholder="url"/>
				</div>
				<div className="profile-attr">
					<p className="title">REGION</p>
					<SelectBlock mode="single" data={region} value={userRegion} setValue={setUserRegion} />
				</div>
				<div className="profile-attr">
					<p className="title">STACK</p>
					<SelectBlock mode="multi" data={skills} value={userStacks} setValue={getStacks} removeValue={removeStacks} />
				</div>
				<div className="profile-attr">
					<p className="title">INTEREST THEME</p>
					<SelectBlock mode="multi" data={themes} value={userThemes} setValue={getThemes} removeValue={removeThemes} />
				</div>
				<div className="profile-attr">
					<p className="title">INTEREST PRODUCT</p>
					<SelectBlock mode="multi" data={results} value={userProducts} setValue={getProducts} removeValue={removeProducts} />
				</div>
				<div className="profile-attr">
					<p className="title">INTRODUCT</p>
					<Editor editorValue={intro} OCV={setIntro}/>
				</div>
			</div>
			<div className="profile-edit-btn">
				수정하기
			</div>
		</div>
		}
		</>
	);
};

Profile.propTypes = {

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

export default Profile;
