import React, { useCallback, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import Editor from "../components/Editor";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { Search, CameraAlt } from "@material-ui/icons";

import { defaultProfile } from "../config/config";
import { CLOSE_SUB_PROFILE } from "../reducers/component";
import { UPLOAD_PROFILE_IMAGE_REQUEST } from "../reducers/user";

import SelectAttr from "../components/buttons/SelectAttr";
import { LoadingBox100P } from "../components/LoadingCircles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	},
}));

const NoSubProfile = () => {
	const { skills, region, results, themes } = useSelector(
		(state) => state.common
	);
	const { uploadedImageBeforeSave, isUploadingProfileImage } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const [status, setStatus] = useState(0);
	const [userRegion, setUserRegion] = useState(null);
	const [userSkill, setUserSkill] = useState([]);
	const [userTheme, setUserTheme] = useState([]);
	const [userPurpose, setUserPerpose] = useState([]);
	const [userProfileImg, setUserProfileImg] = useState("");
	const [introduct, setIntroduct] = useState("");

	const visibleName = "sP-ipt-box visible";
	const hideName = "sP-ipt-box hide";

	const iptDone = useCallback(
		(e) => {
			console.log(status);
			if (status === 1) {
				console.log(userRegion);
				if (userRegion) setStatus(2);
			} else if (status === 2) {
				if (userTheme.length > 0) setStatus(3);
			} else if (status === 3) {
				if (userPurpose.length > 0) {
					setStatus(4);
				}
			} else if (status === 4) {
				if (userSkill.length > 0) {
					setStatus(5);
				}
			} else if (status === 5) {
				setStatus(6);
			} else {
				dispatch({ type: CLOSE_SUB_PROFILE });
				// 서버로 전송
				// 창 닫는 것도 state통해서 성공하면 닫기
			}
		},
		[status, userRegion, userSkill, userTheme, userPurpose]
	);

	const OCTheme = useCallback(
		(data) => {
			if (!userTheme.find((v) => v.key === data.key))
				setUserTheme([...userTheme, data]);
			else {
				setUserTheme(userTheme.filter((v) => v.key !== data.key));
			}
		},
		[userTheme]
	);

	const OCPurpose = useCallback(
		(data) => {
			if (!userPurpose.find((v) => v.key === data.key))
				setUserPerpose([...userPurpose, data]);
			else setUserPerpose(userPurpose.filter((v) => v.key !== data.key));
		},
		[userPurpose]
	);

	const OCSkill = useCallback(
		(data) => {
			if (!userSkill.find((v) => v.key === data.key))
				setUserSkill([...userSkill, data]);
			else setUserSkill(userSkill.filter((v) => v.key !== data.key));
		},
		[userSkill]
	);

	const SetBtn = ({ text = "다음" }) => {
		return (
			<div className="sP-btn" onClick={iptDone}>
				{text}
			</div>
		);
	};

	const classes = useStyles();

	const [ThemeList, setThemeList] = useState(themes);
	const [themeText, setThemeText] = useState("");

	const OCThemeText = useCallback(
		(e) => {
			setThemeText(e.target.value);
			setThemeList(
				themes.filter((v) =>
					v.value.toLowerCase().match(e.target.value.toLowerCase())
				)
			);
		},
		[themeText, ThemeList]
	);

	const [purposeList, setPurposeList] = useState(results);
	const [purposeText, setPurposeText] = useState("");

	const OCPurposeText = useCallback(
		(e) => {
			setPurposeText(e.target.value);
			setPurposeList(
				results.filter((v) =>
					v.value.toLowerCase().match(e.target.value.toLowerCase())
				)
			);
		},
		[purposeText, purposeList]
	);

	const [skillList, setSkillList] = useState(skills);
	const [skillText, setSkillText] = useState("");

	const OCSkillText = useCallback(
		(e) => {
			setSkillText(e.target.value);
			setSkillList(
				skills.filter((v) =>
					v.value.toLowerCase().match(e.target.value.toLowerCase())
				)
			);
		},
		[skillList, skillText]
	);

	const imageInput = useRef();

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onChangeImg = useCallback((e) => {
		const imageFormData = new FormData();
		imageFormData.append("image", e.target.files[0]);
		dispatch({
			type: UPLOAD_PROFILE_IMAGE_REQUEST,
			data: imageFormData,
		});
	}, []);

	return (
		<div className="noSubProfile ab-center">
			<div className="sP-ipt-container">
				<div className={status === 0 ? visibleName : hideName}>
					<p>프로필 사진을 업로드해주세요.</p>
					<div className="profile-img noSub">
						{isUploadingProfileImage ? (
							<LoadingBox100P className="noSub" />
						) : (
							<div
								className="image"
								style={{
									backgroundImage: `url(${
										uploadedImageBeforeSave
											? uploadedImageBeforeSave
											: userProfileImg !== ""
											? userProfileImg
											: defaultProfile
									})`,
								}}
							>
								<button onClick={onClickImageUpload}>
									<CameraAlt style={{ color: "white" }} />
								</button>
								<input
									type="file"
									ref={imageInput}
									onChange={onChangeImg}
								/>
							</div>
						)}
					</div>
					<div className="btn-box ai-jc-center">
						<div
							className="btn boxShadow"
							onClick={() => setStatus(1)}
						>
							기본 이미지로 할래요.
						</div>
						<div
							className="btn boxShadow"
							onClick={() => setStatus(1)}
						>
							업로드한 이미지로 할래요.
						</div>
					</div>
				</div>
				{status >= 1 && (
					<div className={status === 1 ? visibleName : hideName}>
						<p>지역을 선택해주세요.</p>
						<div className="flex-row">
							<SelectAttr
								listValue={false}
								value={userRegion}
								status="profile"
								name="지역"
								data={region}
								getAction={setUserRegion}
								idx={11}
							/>
						</div>
						<SetBtn />
					</div>
				)}
				{status >= 2 && (
					<div className={status === 2 ? visibleName : hideName}>
						<p>관심있는 테마를 선택해주세요.</p>
						<ChipBox
							text={themeText}
							OCText={OCThemeText}
							dataList={ThemeList}
							stateValue={userTheme}
							OCState={OCTheme}
							classes={classes}
						/>
						<SetBtn />
					</div>
				)}
				{status >= 3 && (
					<div className={status === 3 ? visibleName : hideName}>
						<p>관심 분야를 선택해주세요.</p>
						<ChipBox
							text={purposeText}
							OCText={OCPurposeText}
							dataList={purposeList}
							stateValue={userPurpose}
							OCState={OCPurpose}
							classes={classes}
						/>
						<SetBtn />
					</div>
				)}
				{status === 4 && (
					<div className={status === 4 ? visibleName : hideName}>
						<p>기술 스택들을 선택해주세요.</p>
						<ChipBox
							text={skillText}
							OCText={OCSkillText}
							dataList={skillList}
							stateValue={userSkill}
							OCState={OCSkill}
							classes={classes}
						/>
						<SetBtn />
					</div>
				)}
				{status === 5 && (
					<div className={status === 5 ? visibleName : hideName}>
						<p>간단한 자기소개를 작성해주세요.</p>
						<Editor
							editorValue={introduct}
							OCV={setIntroduct}
							height={"600px"}
						/>
						<SetBtn />
					</div>
				)}
				{status === 6 && (
					<div className={status === 6 ? visibleName : hideName}>
						<h1>작성해주셔서 감사합니다.</h1>
						<SetBtn text="작성완료" />
					</div>
				)}
			</div>
		</div>
	);
};

const ChipBox = ({ text, OCText, dataList, stateValue, OCState, classes }) => {
	return (
		<div className="chip-wrap">
			<div className="search-box">
				<Search />
				<input type="text" value={text} onChange={OCText} autoFocus />
			</div>
			<div className={classes.root + " chip-box"}>
				{dataList.map((c, i) => {
					const inState = stateValue.find((v) => v.key === c.key);
					return (
						<Chip
							key={i}
							label={c.value}
							onClick={() => OCState(c)}
							style={
								inState && {
									background:
										"linear-gradient(to bottom right, #7990ff, #9198e5)",
									color: "#fff",
								}
							}
							clickable
						/>
					);
				})}
			</div>
		</div>
	);
};

NoSubProfile.propTypes = {};

export default NoSubProfile;
