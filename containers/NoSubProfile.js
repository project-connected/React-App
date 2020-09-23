import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Curtain from './Curtain'
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_SUB_PROFILE } from '../reducers/component';

import StackBlock from '../components/StackBlock';
import SetStack from '../components/buttons/SetStack';
import SelectAttr from '../components/buttons/SelectAttr';

const dummyResult = [{
	key: 'APPLICATION',
	value: '어플리케이션 개발'
}, {
	key: 'WEB',
	value: '웹 개발'
}, {
	key: 'SERVER',
	value: '서버 개발'
}];

const NoSubProfile = props => {
	const { skills, region } = useSelector(state=>state.common);
	const dispatch = useDispatch();

	const [status, setStatus] = useState(0)
	const [userRegion, setUserRegion] = useState('');
	const [userStacks, setUserStacks] = useState([]);
	const [userInterest, setUserInterest] = useState([]);

	const visibleName = "sP-ipt-box visible";
	const hideName = 'sP-ipt-box hide';

	const OCUserStacks = useCallback((stack) => {
		setUserStacks([...userStacks, stack])
	}, [userStacks])

	const iptDone = useCallback((e) => {
		if (status === 0) {
			if (userRegion !== '')
				setStatus(1)
		} else if (status === 1) {
			if (userStacks.length > 0)
				setStatus(2)
		} else if (status === 2) {
			if (userInterest.length > 0) {
				setStatus(3)
			}
		} else {
			dispatch({type: CLOSE_SUB_PROFILE})
			// 서버로 전송
			// 창 닫는 것도 state통해서 성공하면 닫기
		}
	}, [status, userRegion, userStacks, userInterest])

	const removeStack = useCallback((stack) => (e) => {
		e.preventDefault();
		setUserStacks(userStacks.filter(v => v.key !== stack.key))
	}, [userStacks]);

	const OCInterset = useCallback((interest) =>{
		if (!userInterest.find(v=>v.key === interest.key))
			setUserInterest([...userInterest, interest]);
	}, [userInterest]);

	const removeInterest = useCallback((interest) => (e) => {
		e.preventDefault();
		setUserInterest(userInterest.filter(v => v.key !== interest.key));
	}, [userInterest]);

	const SetBtn = ({ text="다음"}) => {
		return (
			<div className="sP-btn" onClick={iptDone}>
				{text}
			</div>
		)
	}

	return (
		<div className="noSubProfile">
			<div className="sP-ipt-container">
				<div className={status === 0 ? visibleName : hideName}>
					<p>지역을 선택해주세요.</p>
					<div className="flex-row">
						<SelectAttr status="profile" name="지역" data={region} getAction={setUserRegion} idx={11}/>
					</div>
					<SetBtn />
				</div>
				{status >= 1 &&
					<div className={status === 1 ? visibleName : hideName}>
						<p>관심있는 기술이나 가능한 기술을 선택해주세요.</p>
						<div className="flex-row stack">
							<SetStack stacks={skills} value={userStacks} setValue={OCUserStacks}/>
							<div className="stack-wrap">
									<div className="stack-block-box">
									{userStacks.map((c) => {
										return (
											<StackBlock name={c.value} color={c.color} key={c.key} onClick={removeStack(c)}/>
										)
									})}
								</div>
							</div>
						</div>
						<SetBtn />
					</div>
				}
				{status >= 2 &&
					<div className={status=== 2 ? visibleName : hideName}>
						<p>관심 분야를 선택해주세요.</p>
						<div className="flex-row stack">
							<SelectAttr open={true} val={userInterest} status="many" name="분야" data={dummyResult} getAction={OCInterset} idx={12}/>
							<div className="stack-wrap">
								<div className="stack-block-box interest">
									{userInterest.map((c) => {
										return (
											<StackBlock key={c.key} color="linear-gradient(to bottom right,#7990ff,#9198e5)" name={c.value} onClick={removeInterest(c)} />
										)
									})}
								</div>
							</div>
						</div>
						<SetBtn />
					</div>
				}
				{status === 3 &&
					<div className="sP-ipt-box visible">
						<h1>감사합닌다</h1>
						<SetBtn text="완료"/>
					</div>
				}
			</div>
		</div>
	);
};

NoSubProfile.propTypes = {

};

export default NoSubProfile;
