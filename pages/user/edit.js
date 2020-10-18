import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { VpnKey, CameraAlt } from "@material-ui/icons";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

import useInput from "../../hooks/useInput";
import useInputWithSetter from "../../hooks/useInputWithSetter";

import Editor from "../../components/Editor";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import { LOAD_COMMON_REQUEST } from "../../reducers/common";
import { UPLOAD_PROFILE_IMAGE_REQUEST } from "../../reducers/user";

import { defaultProfile } from "../../config/config";
import SelectBlocks from "../../components/buttons/SelectBlocks";
import LoadingCircles from "../../components/LoadingCircles";
import { CircularProgress } from "@material-ui/core";

const ChangePassword = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const newRef = useRef();
	const checkRef = useRef();

	const [pw, setPW, OCPW] = useInputWithSetter("");
	const [newPW, setNewPW, OCNewPW] = useInputWithSetter("");
	const [checkNewPW, setCheckNewPW, OCCheckNewPW] = useInputWithSetter("");
	const [error, setError] = useState(false);

	const [idx, setIdx] = useState(0);

	useEffect(() => {
		if (open) {
			setIdx(1);
		} else {
			setIdx(0);
			setPW("");
			setNewPW("");
			setCheckNewPW("");
		}
	}, [open]);

	const backgroundClass = open ? "back-btn visible" : "back-btn hide";

	const closeComponent = useCallback((e) => {
		e.preventDefault();
		setOpen(false);
	}, []);

	const checkPW = useCallback(
		(e) => {
			e.preventDefault();
			// dispatch({
			// 	type: CHECK_PASSWORD,
			// 	data: pw
			// })
			console.log("check pw");
			setIdx(2);
		},
		[pw]
	);

	const changePWRequest = useCallback(
		(e) => {
			e.preventDefault();
			if (newPW.length < 6 || newPW !== checkNewPW) {
				setError(true);
				return;
			} else {
				setError(false);
			}

			// dispatch({
			// 	type: CHANGE_PASSWORD_REQUEST,
			// 	data: {
			// 		new_password: newPW,
			// 	}
			// })
			if (confirm("비밀번호를 변경하시겠습니까?")) {
				console.log("enter new pw");
				setOpen(false);
			}
		},
		[newPW, checkNewPW, error]
	);

	return (
		<>
			<div className={backgroundClass} onClick={closeComponent} />
			{idx === 1 && (
				<div className="pw-change-box boxShadow">
					<p>비밀번호를 입력해주세요.</p>
					<input
						name="pw"
						placeholder="password"
						value={pw}
						onChange={OCPW}
						type="password"
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								checkPW(e);
							}
							if (e.key == 48) {
								setOpen(false);
							}
						}}
						autoFocus
					/>
				</div>
			)}
			{idx >= 2 && (
				<div className="pw-change-box boxShadow">
					<p>변경하실 비밀번호를 입력해주세요.</p>
					<input
						name="pw"
						placeholder="new password"
						type="password"
						value={newPW}
						onChange={OCNewPW}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								setIdx(3);
								checkRef.current.focus();
							}
							if (e.key == 48) {
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
							if (e.key === "Enter") {
								changePWRequest(e);
							}
							if (e.key == 48) {
								setOpen(false);
							}
						}}
					/>
					{error && (
						<p style={{ color: "#ff3333" }}>
							비밀번호를 다시 확인해주세요.
						</p>
					)}
				</div>
			)}
		</>
	);
};

const Profile = () => {
	const {
		user,
		uploadedImageBeforeSave,
		isUploadingProfileImage,
	} = useSelector((state) => state.user);
	const { skills, themes, region, results } = useSelector(
		(state) => state.common
	);

	const [name, OCName] = useInput(user ? user.userName : "");
	const [url, OCUrl] = useInput(user.url);
	const [userRegion, setUserRegion] = useState(user.region);
	const [userStacks, setUserStacks] = useState(user.skill);
	const [userThemes, setUserThemes] = useState(user.theme);
	const [userProducts, setUserProducts] = useState(user.purpose);
	const [intro, setIntro] = useState(user.introduct);

	const [changePWOpen, setChangePWOpen] = useState(false);

	const dispatch = useDispatch();

	const getStacks = useCallback(
		(stack) => {
			setUserStacks([...userStacks, stack]);
		},
		[userStacks]
	);

	const removeStacks = useCallback(
		(stack) => (e) => {
			e.preventDefault();
			setUserStacks(userStacks.filter((v) => v.key !== stack.key));
		},
		[userStacks]
	);

	const getThemes = useCallback(
		(theme) => {
			setUserThemes([...userThemes, theme]);
		},
		[userThemes]
	);

	const removeThemes = useCallback(
		(theme) => (e) => {
			e.preventDefault();
			setUserThemes(userThemes.filter((v) => v.key !== theme.key));
		},
		[userThemes]
	);

	const getProducts = useCallback(
		(product) => {
			setUserProducts([...userProducts, product]);
		},
		[userProducts]
	);

	const removeProducts = useCallback(
		(product) => (e) => {
			e.preventDefault();
			setUserProducts(userProducts.filter((v) => v.key !== product.key));
		},
		[userProducts]
	);

	useEffect(() => {
		if (!user) {
			alert("로그인을 해주세요.");
			Router.push("/");
		}
	}, [user]);

	const imageInput = useRef();

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onChangeImg = useCallback((e) => {
		const imageFormData = new FormData();
		imageFormData.append("thumb", e.target.files[0]);
		dispatch({
			type: UPLOAD_PROFILE_IMAGE_REQUEST,
			data: imageFormData,
		});
	}, []);

	return (
		<>
			{user && (
				<div id="myProfile">
					<ChangePassword
						open={changePWOpen}
						setOpen={setChangePWOpen}
					/>
					<div className="main-info">
						<div className="profile-img">
							<div
								className="image"
								style={{
									backgroundImage: `url(${
										uploadedImageBeforeSave
											? uploadedImageBeforeSave
											: user.profileImg
											? user.profileImg
											: defaultProfile
									})`,
								}}
							>
								{isUploadingProfileImage ? (
									<CircularProgress color="#fff" />
								) : (
									<>
										<button onClick={onClickImageUpload}>
											<CameraAlt
												style={{ color: "white" }}
											/>
										</button>
										<input
											type="file"
											ref={imageInput}
											onChange={onChangeImg}
										/>
									</>
								)}
							</div>
						</div>
						<div className="login-info">
							<div name="email">{user.email}</div>
							<div name="name">{user.userName}</div>
							<div
								name="change-pwd"
								onClick={(e) => {
									e.preventDefault();
									setChangePWOpen(true);
								}}
							>
								<VpnKey />
								비밀번호 변경하기
							</div>
						</div>
					</div>
					<div className="info-line">
						<h3> Info</h3>
						<div className="line"></div>
					</div>
					<div className="profile-form">
						<div className="profile-attr">
							<p className="title">NICKNAME</p>
							<input
								value={name}
								onChange={OCName}
								type="text"
								placeholder="닉네임"
							/>
						</div>
						<div className="profile-attr">
							<p className="title">URL</p>
							<input
								value={url}
								onChange={OCUrl}
								type="text"
								placeholder="url"
							/>
						</div>
						<div className="profile-attr">
							<p className="title">REGION</p>
							<SelectBlocks
								mode="single"
								data={region}
								value={userRegion}
								setValue={setUserRegion}
								placeholder="활동 지역을 선택해주세요."
							/>
						</div>
						<div className="profile-attr">
							<p className="title">STACK</p>
							<SelectBlocks
								mode="multi"
								data={skills}
								value={userStacks}
								setValue={getStacks}
								removeValue={removeStacks}
								placeholder="활용 가능한 능력을 선택해주세요."
							/>
						</div>
						<div className="profile-attr">
							<p className="title">INTEREST THEME</p>
							<SelectBlocks
								mode="multi"
								data={themes}
								value={userThemes}
								setValue={getThemes}
								removeValue={removeThemes}
								placeholder="흥미있는 테마를 선택해주세요."
							/>
						</div>
						<div className="profile-attr">
							<p className="title">INTEREST PRODUCT</p>
							<SelectBlocks
								mode="multi"
								data={results}
								value={userProducts}
								setValue={getProducts}
								removeValue={removeProducts}
								placeholder="흥미있는 분야를 선택해주세요."
							/>
						</div>
						<div className="profile-attr">
							<p className="title">INTRODUCT</p>
							<Editor
								editorValue={intro}
								OCV={setIntro}
								height="500px"
							/>
						</div>
					</div>
					<div className="profile-edit-btn">저장하기</div>
				</div>
			)}
		</>
	);
};

Profile.propTypes = {};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : "";
		axios.defaults.headers.Cookie = "";
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
		});
		context.store.dispatch({
			type: LOAD_COMMON_REQUEST,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Profile;
