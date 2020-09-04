import React, {useEffect, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import Router from 'next/router';
import moment from 'moment';

import axios from 'axios';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';

import { KeyboardArrowDown } from '@material-ui/icons';

import { Editor } from '../project/create';

import useWindowSize from '../../hooks/useWindowSize';
import useInput from '../../hooks/useInput';
import useInputWithSetter from '../../hooks/useInputWithSetter';

import SetStack from '../../components/buttons/SetStack';
import StackBlock from '../../components/StackBlock';
import SelectAttr from '../../components/buttons/SelectAttr';

import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

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

const CreateMyAppeal = props => {
	const dispatch = useDispatch();
	const { user } = useSelector(state=>state.user);
	const { skills, region, themes } = useSelector(state=>state.common);
	const { windowRef } = useSelector(state=>state.component);

	const [title, OCTitle] = useInput('');
	const [regionState, setRegion] = useState('');
	const [themeState, setTheme] = useState('');
	const [resultState, setResult] = useState('');
	const [period, setPeriod] = useState({
									startDate: new Date(),
									endDate: new Date(),
									diff: 0,
								});
	const [stackState, setStacks] = useState([]);
	const [desc, setDesc] = useState('');
	const [iptStatus, setIptStatus] = useState(1);
	const [endDateAvail, setEndDateAvail] = useState(false);
	const [periodWarn, setPeriodWarn] = useState('');

	const scrollRef = useRef();

	const nextIptvisible = useCallback((e) => {
		e.preventDefault();

		if (iptStatus === 1) {
			if (themeState === '' || resultState === '' || regionState === '')
				return;
		} else if (iptStatus === 2) {
			if (period.startDate.getTime() === period.endDate.getTime())
				return ;
		} else if (iptStatus === 3) {
			if (title === '')
				return ;
		} else if (iptStatus === 4) {
			if (stackState.length === 0)
				return ;
		} else {
			if (desc === '')
				return ;
		}
		setIptStatus(iptStatus + 1);
	}, [iptStatus, themeState, resultState, title, regionState, period, stackState, desc]);

	const OCStartDate = useCallback((date) => {
		if (date.getTime() < new Date().getTime())
		{
			setPeriodWarn('오늘 이후 날짜를 선택해주세요.');
			setEndDateAvail(false);
		} else {
			setPeriodWarn('');
			setPeriod({ ...period, startDate: date});
			setEndDateAvail(true);
		}
	}, [period]);

	const OCEndDate = useCallback((date) => {
		if (date.getTime() <= period.startDate.getTime())
		{
			setPeriodWarn('시작일 이후 날짜로 선택해주세요.');
		}
		else {
			setPeriodWarn('');
			setPeriod({
				...period,
				endDate: date,
			});
		}
	}, [period]);

	const getStack = useCallback((stack) => {
		setStacks([...stackState, stack]);
	}, [stackState]);

	const removeStack = useCallback((stack) => (e) => {
		e.preventDefault();
		setStacks(stackState.filter(v => v.key !== stack.key));
	}, [stackState]);

	useEffect(() => {
		if (period.startDate.getTime() < period.endDate.getTime()) {
			setPeriod({
				...period,
				diff: (period.endDate.getTime() - period.startDate.getTime()) / (24 * 60 * 60 * 1000),
			})
		}
	}, [period.startDate, period.endDate]);

	return (
		<>
		<div id="new-jewel-wrap" ref={scrollRef}>
			<div className={`new-jewel-page ${iptStatus > 0 ? 'visible' : ''}`}>
				<div className="new-jewel-content">
					<h3 className="title">1.</h3>
					<p>어떤 목적의 프로젝트를 하고 싶으신가요?</p>
					<SelectAttr
						name="목적"
						data={themes}
						idx={8}
						getAction={setTheme}
						status="profile"
					/>
					<p>어떤 결과물을 만들어보고 싶으신가요?</p>
					<SelectAttr
						name="결과물"
						data={dummyResult}
						idx={9}
						getAction={setResult}
						status="profile"
					/>
					<p>어느 지역에서 진행하고 싶으신가요?</p>
					<SelectAttr
						name="지역"
						data={region}
						idx={10}
						getAction={setRegion}
						status="profile"
					/>
				</div>
			</div>
			<div className={`new-jewel-page ${iptStatus > 1 ? 'visible' : ''}`}>
				<div className="new-jewel-content">
					<h3 className="title">2.</h3>
					{ periodWarn === '' ? <p>원하는 프로젝트 진행 기간을 선택해주세요.</p> :  <p className="warn">{periodWarn}</p> }
					<div className="seperate-box period">
						<div className="calendar-box">
							<p>시작일을 선택해주세요.</p>
							<Calendar
								value={period.startDate}
								onChange={OCStartDate}
								calendarType="US"
							/>
						</div>
						{
							endDateAvail &&
							<div className="calendar-box">
								<p>마감일을 선택해주세요.</p>
								<Calendar
									value={period.endDate}
									onChange={OCEndDate}
									calendarType="US"
								/>
							</div>
						}
						</div>
						{(period.diff > 0 && periodWarn === '') &&
							<div className="period-info-box">
								<div><p>시작일</p><span><b>{moment(period.startDate).format('YYYY년 MM월 DD일')}</b></span></div>
								<div><p>마감일</p><span><b>{moment(period.endDate).format('YYYY년 MM월 DD일')}</b></span></div>
								<div><p>기간</p><span>총 <b>{period.diff}</b>일</span></div>
							</div>
						}
				</div>
			</div>
			<div className={`new-jewel-page ${iptStatus > 2 ? 'visible' : ''}`}>
				<div className="new-jewel-content">
				<h3 className="title">3.</h3>
					<p>제목을 입력해주세요.</p>
					<input
						name="title"
						value={title}
						onChange={OCTitle}
						onKeyPress={(e) => {
							if(e.key === 'Enter') {
								nextIptvisible(e);
							}
						}}
					/>
				</div>
			</div>
			<div className={`new-jewel-page ${iptStatus > 3 ? 'visible' : ''}`}>
				<div className="new-jewel-content stack">
					<h3 className="title">4.</h3>
					<p>가능하신 기술 스택을 골라주세요.</p>
					<SetStack stacks={skills} value={stackState} setValue={getStack} />
					<p>당신의 기술 스택</p>
					<div className="stack-block-box">
						{stackState.map((c, i) => {
							return (
								<StackBlock onClick={removeStack(c)} name={c.value} color={c.color} key={(i)}/>
							)
						})}
					</div>
				</div>
			</div>
			<div className={`new-jewel-page ${iptStatus > 4 ? 'visible' : ''}`}>
				<div className="new-jewel-content">
					<h3 className="title">5.</h3>
					<p>자세한 자기 소개를 작성해주세요.</p>
					<Editor editorValue={desc} OCV={setDesc} />
				</div>
			</div>
			<button className="next" onClick={nextIptvisible}>
				<KeyboardArrowDown />
			</button>
		</div>
		{/* <button className="next" onClick={nextIptvisible(0)}>
			<KeyboardArrowDown />
		</button> */}
		</>
	);
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

CreateMyAppeal.propTypes = {

};

export default CreateMyAppeal;
