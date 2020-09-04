import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Curtain from './Curtain'
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_SUB_PROFILE } from '../reducers/component';

import StackBlock from '../components/StackBlock';
import SetStack from '../components/buttons/SetStack';
import SelectAttr from '../components/buttons/SelectAttr';

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
		setUserStacks([...userStacks, stack]);
	})

	const iptDone = useCallback((e) => {
		if (status === 0) {
			console.log(userRegion)
			if (userRegion !== '')
				setStatus(1)
		} else if (status === 1) {
			if (userStacks.length() > 0)
				setStatus(2)
		} else if (status === 2) {
			if (userInterest.length() > 0) {
				setStatus(3)
			}
		} else {
			dispatch({type: CLOSE_SUB_PROFILE})
		}
	}, [status, userRegion, userStacks, userInterest])

	const SetBtn = () => {
		return (
			<div className="sP-btn" onClick={iptDone}>
				입력
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
						<SetBtn />
					</div>
				</div>
				{status >= 1 &&
					<div className={status === 1 ? visibleName : hideName}>
						<p>관심있는 기술이나 가능한 기술을 선택해주세요.</p>
						<div className="flex-row">
							<SetStack stacks={skills} value={userStacks} setValue={OCUserStacks}/>
							<div className="stack-block-box">
								{userStacks.map((c) => {
									return (
										<StackBlock name={c.value} color={c.color} key={c.key} />
									)
								})}
							</div>
						</div>
					</div>
				}
				{status >= 2 &&
					<div className={status=== 2 ? visibleName : hideName}>
						<p>관심 분야를 선택해주세요.</p>
						관심 분야
					</div>
				}
				{status === 3 &&
					<div className="sP-ipt-box visible">
						감사합니덩
					</div>
				}
			</div>
		</div>
	);
};

NoSubProfile.propTypes = {

};

export default NoSubProfile;
