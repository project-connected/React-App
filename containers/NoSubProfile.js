import React, { useCallback, useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';

import Editor from '../components/Editor';
import { makeStyles } from '@material-ui/core/styles';
import { Search, CameraAlt } from '@material-ui/icons';

import { defaultProfile } from '../config/config';
import { CLOSE_SUB_PROFILE } from '../reducers/component';
import { UPLOAD_PROFILE_IMAGE_REQUEST } from '../reducers/user';

import SelectAttr from '../components/buttons/SelectAttr';
import { LoadingBox100P } from '../components/LoadingCircles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
}));

const NoSubProfile = () => {
	const { skills, region, results, themes } = useSelector(
		(state) => state.common,
	);
	const {
		user,
		uploadedImageBeforeSave,
		isUploadingProfileImage,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [status, setStatus] = useState(0);
	const [userRegion, setUserRegion] = useState(null);
	const [userSkill, setUserSkill] = useState([]);
	const [userTheme, setUserTheme] = useState([]);
	const [userPurpose, setUserPerpose] = useState([]);
	const [introduct, setIntroduct] = useState('');

	const iptDone = useCallback(
		(e) => {
			console.log(status);
			if (status === 1) {
				if (userRegion) {
					setStatus(2);
					setAvailPage(2);
				}
			} else if (status === 2) {
				if (userTheme.length > 0) {
					setStatus(3);
					setAvailPage(3);
				}
			} else if (status === 3) {
				if (userPurpose.length > 0) {
					setStatus(4);
					setAvailPage(4);
				}
			} else if (status === 4) {
				if (userSkill.length > 0) {
					setStatus(5);
					setAvailPage(5);
				}
			} else if (status === 5) {
				setStatus(6);
			} else {
				dispatch({ type: CLOSE_SUB_PROFILE });
				// 서버로 전송
				// 창 닫는 것도 state통해서 성공하면 닫기
			}
		},
		[status, userRegion, userSkill, userTheme, userPurpose],
	);

	const OCTheme = useCallback(
		(data) => {
			if (!userTheme.find((v) => v.key === data.key))
				setUserTheme([...userTheme, data]);
			else {
				setUserTheme(userTheme.filter((v) => v.key !== data.key));
			}
		},
		[userTheme],
	);

	const OCPurpose = useCallback(
		(data) => {
			if (!userPurpose.find((v) => v.key === data.key))
				setUserPerpose([...userPurpose, data]);
			else setUserPerpose(userPurpose.filter((v) => v.key !== data.key));
		},
		[userPurpose],
	);

	const OCSkill = useCallback(
		(data) => {
			if (!userSkill.find((v) => v.key === data.key))
				setUserSkill([...userSkill, data]);
			else setUserSkill(userSkill.filter((v) => v.key !== data.key));
		},
		[userSkill],
	);

	const SetBtn = ({ text = '다음' }) => {
		return (
			<div className="sP-btn" onClick={iptDone}>
				{text}
			</div>
		);
	};

	const classes = useStyles();

	const [ThemeList, setThemeList] = useState(themes);
	const [themeText, setThemeText] = useState('');

	const OCThemeText = useCallback(
		(e) => {
			setThemeText(e.target.value);
			setThemeList(
				themes.filter((v) =>
					v.value.toLowerCase().match(e.target.value.toLowerCase()),
				),
			);
		},
		[themeText, ThemeList],
	);

	const [purposeList, setPurposeList] = useState(results);
	const [purposeText, setPurposeText] = useState('');

	const OCPurposeText = useCallback(
		(e) => {
			setPurposeText(e.target.value);
			setPurposeList(
				results.filter((v) =>
					v.value.toLowerCase().match(e.target.value.toLowerCase()),
				),
			);
		},
		[purposeText, purposeList],
	);

	const [skillList, setSkillList] = useState(skills);
	const [skillText, setSkillText] = useState('');

	const OCSkillText = useCallback(
		(e) => {
			setSkillText(e.target.value);
			setSkillList(
				skills.filter((v) =>
					v.value.toLowerCase().match(e.target.value.toLowerCase()),
				),
			);
		},
		[skillList, skillText],
	);

	const imageInput = useRef();

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onChangeImg = useCallback((e) => {
		const imageFormData = new FormData();
		imageFormData.append('img', e.target.files[0]);
		dispatch({
			type: UPLOAD_PROFILE_IMAGE_REQUEST,
			data: imageFormData,
		});
	}, []);

	const [availPage, setAvailPage] = useState(0);
	const [aniCN, setAniCN] = useState('next');

	const headerClick = useCallback(
		(e, idx) => {
			if (idx > availPage) return;
			if (status > idx) setAniCN('before');
			else setAniCN('next');
			setStatus(idx);
		},
		[availPage, status],
	);

	return (
		<div className="noSubProfile ab-center">
			<div className="sP-ipt-container">
				<AppBar position="static" className="noSub">
					<Tabs
						value={availPage}
						onChange={headerClick}
						variant="scrollable"
						scrollButtons="off"
					>
						<Tab
							className="header-tap"
							label={1}
							style={{
								background: `${
									0 <= availPage
										? 'linear-gradient(#7990ff, #9198e5)'
										: '#dadada'
								}`,
							}}
						></Tab>
						<Tab
							className="header-tap"
							label={2}
							style={{
								background: `${
									1 <= availPage
										? 'linear-gradient(#7990ff, #9198e5)'
										: '#dadada'
								}`,
							}}
						></Tab>
						<Tab
							className="header-tap"
							label={3}
							style={{
								background: `${
									2 <= availPage
										? 'linear-gradient(#7990ff, #9198e5)'
										: '#dadada'
								}`,
							}}
						></Tab>
						<Tab
							className="header-tap"
							label={4}
							style={{
								background: `${
									3 <= availPage
										? 'linear-gradient(#7990ff, #9198e5)'
										: '#dadada'
								}`,
							}}
						></Tab>
						<Tab
							className="header-tap"
							label={5}
							style={{
								background: `${
									4 <= availPage
										? 'linear-gradient(#7990ff, #9198e5)'
										: '#dadada'
								}`,
							}}
						></Tab>
						<Tab
							className="header-tap Finish"
							label={'Finish'}
							style={{
								background: `${
									5 <= availPage
										? 'linear-gradient(#7990ff, #9198e5)'
										: '#dadada'
								}`,
							}}
						></Tab>
					</Tabs>
				</AppBar>
				{status === 0 && (
					<div
						className={'sP-ipt-box ' + (status === 0 ? aniCN : '')}
					>
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
												: user.profileImg
												? user.profileImg
												: defaultProfile
										})`,
									}}
								>
									<button onClick={onClickImageUpload}>
										<CameraAlt style={{ color: 'white' }} />
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
								onClick={() => {
									setStatus(1);
									setAvailPage(1);
								}}
							>
								기본 이미지로 할래요.
							</div>
							<div
								className="btn boxShadow"
								onClick={() => {
									setStatus(1);
									setAvailPage(1);
								}}
							>
								업로드한 이미지로 할래요.
							</div>
						</div>
					</div>
				)}
				{status === 1 && (
					<div
						className={'sP-ipt-box ' + (status === 1 ? aniCN : '')}
					>
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
				{status === 2 && (
					<div
						className={'sP-ipt-box ' + (status === 2 ? aniCN : '')}
					>
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
				{status === 3 && (
					<div
						className={'sP-ipt-box ' + (status === 3 ? aniCN : '')}
					>
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
					<div
						className={'sP-ipt-box ' + (status === 4 ? aniCN : '')}
					>
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
					<div
						className={'sP-ipt-box ' + (status === 5 ? aniCN : '')}
					>
						<p>간단한 자기소개를 작성해주세요.</p>
						<Editor
							editorValue={introduct}
							OCV={setIntroduct}
							height={'600px'}
						/>
						<SetBtn />
					</div>
				)}
				{status === 6 && (
					<div
						className={'sP-ipt-box ' + (status === 6 ? aniCN : '')}
					>
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
			<div className={classes.root + ' chip-box'}>
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
										'linear-gradient(to bottom right, #7990ff, #9198e5)',
									color: '#fff',
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
