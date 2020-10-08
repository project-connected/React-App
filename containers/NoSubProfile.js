import React, { useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

import { defaultProfile } from '../config/config';
import { CLOSE_SUB_PROFILE } from '../reducers/component';
import SelectAttr from '../components/buttons/SelectAttr';

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

const NoSubProfile = props => {
	const { skills, region, results, themes } = useSelector(state=>state.common);
	const dispatch = useDispatch();

	const [status, setStatus] = useState(0)
	const [userRegion, setUserRegion] = useState('');
	const [userSkill, setUserSkill] = useState([]);
	const [userTheme, setUserTheme] = useState([]);
	const [userPurpose, setUserPerpose] = useState([]);
	const [userProfileImg, setUserProfileImg] = useState('');

	const visibleName = "sP-ipt-box visible";
	const hideName = 'sP-ipt-box hide';

	const iptDone = useCallback((e) => {
		if (status === 1) {
			if (userRegion !== '')
				setStatus(1)
		} else if (status === 2) {
			if (userTheme.length > 0)
				setStatus(2)
		} else if (status === 3) {
			if (userPurpose.length > 0) {
				setStatus(3)
			}
		} else if (status === 4) {
			if (userSkill.length > 0) {
				setStatus(4)
			}
		} else {
			dispatch({type: CLOSE_SUB_PROFILE})
			// 서버로 전송
			// 창 닫는 것도 state통해서 성공하면 닫기
		}
	}, [status, userRegion, userSkill, userTheme, userPurpose])

	const OCTheme = useCallback((data) =>{
		if (!userTheme.find(v=>v.key === data.key))
			setUserTheme([...userTheme, data]);
		else {
			setUserTheme(userTheme.filter(v => v.key !== data.key));
		}
	}, [userTheme]);

	const OCPurpose = useCallback((data) =>{
		if (!userPurpose.find(v=>v.key === data.key))
			setUserPerpose([...userPurpose, data]);
		else
			setUserPerpose(userPurpose.filter(v => v.key !== data.key));
	}, [userPurpose]);

	const OCSkill = useCallback((data) =>{
		if (!userSkill.find(v=>v.key === data.key))
			setUserSkill([...userSkill, data]);
		else
			setUserSkill(userSkill.filter(v => v.key !== data.key));
	}, [userSkill]);

	const SetBtn = ({ text="다음"}) => {
		return (
			<div className="sP-btn" onClick={iptDone}>
				{text}
			</div>
		)
	}

	const classes = useStyles();

	const [ThemeList, setThemeList] = useState(themes);
	const [themeText, setThemeText] = useState('');

	const OCThemeText = useCallback((e) => {
		setThemeText(e.target.value);
		setThemeList(themes.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
	}, [themeText, ThemeList]);

	const [purposeList, setPurposeList] = useState(results);
	const [purposeText, setPurposeText] = useState('');

	const OCPurposeText = useCallback((e) => {
		setPurposeText(e.target.value);
		setPurposeList(results.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
	}, [purposeText, purposeList]);

	const [skillList, setSkillList] = useState(skills);
	const [skillText, setSkillText] = useState('');

	const OCSkillText = useCallback((e) => {
		setSkillText(e.target.value);
		setSkillList(skills.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
	}, [skillList, skillText]);

	return (
		<div className="noSubProfile ab-center">
			<div className="sP-ipt-container">
				<div className={status === 0 ? visibleName : hideName}>
					<p>프로필 사진을 업로드해주세요.</p>
					가운데 프로필사진 + 업로드 버튼
					왼쪽 버튼 (기본이미지로 설정), 오른쪽 버튼(업로드 이미지로 설정)
				</div>
				{status >= 1 &&
					<div className={status === 1 ? visibleName : hideName}>
						<p>지역을 선택해주세요.</p>
						<div className="flex-row">
							<SelectAttr listValue={false} value={userRegion} status="profile" name="지역" data={region} getAction={setUserRegion} idx={11}/>
						</div>
						<SetBtn />
					</div>
				}
				{status >= 2 &&
					<div className={status === 1 ? visibleName : hideName}>
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
				}
				{status >= 3 &&
					<div className={status=== 2 ? visibleName : hideName}>
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
				}
				{status === 4 &&
					<div className={status=== 3 ? visibleName : hideName}>
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
				}
			</div>
		</div>
	);
};

const ChipBox = ({ text, OCText, dataList, stateValue, OCState, classes }) => {
	return (
		<div className="chip-wrap">
			<div className="search-box">
				<Search />
				<input
					type="text"
					value={text}
					onChange={OCText}
					autoFocus
				/>
			</div>
			<div className={classes.root + ' chip-box'}>
				{dataList.map((c, i) => {
					const inState = stateValue.find(v => v.key === c.key);
					return (
						<Chip
							key={(i)}
							label={c.value}
							onClick={() => OCState(c)}
							style={inState && {
								background: 'linear-gradient(to bottom right, #7990ff, #9198e5)',
								color: '#fff'
							}}
							clickable
						/>
					);
				})}
			</div>
		</div>
	)
}

NoSubProfile.propTypes = {

};

export default NoSubProfile;
