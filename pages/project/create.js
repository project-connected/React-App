import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import dynamic from 'next/dynamic';
import moment from 'moment';
import Router from 'next/router';
import useWindowSize from '../../hooks/useWindowSize';
import { END } from 'redux-saga';

import wrapper from '../../store/configureStore';
import axios from 'axios';
import {
	GET_PRIOD_FOR_CREATE, GET_STACK_FOR_CREATE, GET_REGION_FOR_CREATE, GET_THEME_FOR_CREATE, GET_RESULT_FOR_CREATE, DELETE_STACK_FOR_CREATE
} from '../../reducers/project';
import { LOAD_USER_REQUEST } from '../../reducers/user';

import SelectAttr from '../../components/buttons/SelectAttr';
import useInput from '../../hooks/useInput';
import useInputWithSetter from '../../hooks/useInputWithSetter';
import SetStack from '../../components/buttons/SetStack';
import StackBlock from '../../components/StackBlock';

import { KeyboardArrowRight, KeyboardArrowLeft, Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ProjectPage } from './[index]';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';
import { OPEN_SUB_PROFILE } from '../../reducers/component';

export const Editor = dynamic(import ('../../components/Toast'), {
	ssr: false
});

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

const CreateProj = props => {
	const widthRef = useRef();
	const [width, setWidth] = useState(0);
	const [pageOffset, setPageOffset] = useState(0);
	const [ title, OCTitle ] = useInput('');
	const [stack, setStack] = useState(null);
	const [stackNum, setStackNum, OCStackNum] = useInputWithSetter(0);
	const [desc, setDesc] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [clickDate, setClickDate] = useState(false);
	const [warning, setWarning] = useState('');
	const [period, setPeriod] = useState(0);

	const windowSize = useWindowSize();

	const dispatch = useDispatch();

	const { create_stacks, create_theme, create_region, create_result } = useSelector(state=>state.project);
	const { region, skills, themes } = useSelector(state=>state.common);
	const { user } = useSelector(state=>state.user)
	const { openSubProfile } = useSelector(state=>state.component);

	const pageStyle = {
		transform: `translateX(${pageOffset}px`
	}

	const ClickNext = useCallback((idx) => (e) => {
		e.preventDefault();
		if (idx === 0) {
			if (create_theme === '' || create_result === '')
				return;
		} else if (idx === 1) {
			if (title === '')
				return ;
			// 타이틀
		} else if (idx === 2) {
			if (create_region === '')
				return ;
			// 지역
		} else if (idx === 3) {
			if (period === 0)
				return ;
			//기간
		} else if (idx === 4) {
			if (create_stacks.length === 0)
				return ;
			// 스택
		} else {
			if (desc === '')
				return ;
			// 소개
		}
		setPageOffset(pageOffset - width);
	}, [pageOffset, width, create_theme, create_result, title, create_region, period, stack, desc, create_stacks])

	const ClickBefore = useCallback((e) => {
		e.preventDefault();
		setPageOffset(pageOffset + width)
	}, [pageOffset, width])

	const set_create_stacks = useCallback((e) => {
		e.preventDefault()
		if (stackNum > 0) {
			dispatch({
				type: GET_STACK_FOR_CREATE,
				data: {
					value: stack.value,
					color: stack.color,
					num: 0,
					maxNum: Number(stackNum),
				}
			})
			setStack(null);
			setStackNum(0);
		}
	}, [stack, stackNum])

	const deleteStack = useCallback((c) => (e) => {
		dispatch({
			type: DELETE_STACK_FOR_CREATE,
			data: c
		})
	})

	const OCStartDate = useCallback((date) => {
		if (date.getTime() < new Date().getTime())
		{
			setClickDate(false);
			setWarning('이전 날짜는 선택할 수 없습니다.');
		}
		else {
			setWarning('');
			setClickDate(true);
			setStartDate(date);
		}
	}, []);

	const OCPeriod = useCallback((e) => {
		if (e.target.value.match(/[0-9]+/g) || e.target.value === '') {
			setPeriod(e.target.value);
		}
	}, [period]);

	useEffect(() => {
		const preWidth = width;
		const offset = widthRef.current.offsetWidth;
		setWidth(offset);
		if (pageOffset !== 0)
			setPageOffset((pageOffset/preWidth)*offset);
	}, [widthRef, width, windowSize]);

	const createProject = useCallback((e) => {
		e.preventDefault();
		console.log('만들기!');
		// dispatch
	})

	// useEffect(() => {
	// 	alert('프로젝트 모집 게시글이 작성되었어요!');
	// 	Router.push('/project/방금만들어진 프로젝트 id')
	// }, [isCreatedProject]);

	// useEffect(() => {
	// 	if (!user.subProfile && !openSubProfile) {
	// 		alert('추가 정보를 입력해주세요!');
	// 		dispatch({type: OPEN_SUB_PROFILE})
	// 	}
	// }, [user.subProfile, openSubProfile])

	return (
		<div id="create-wrap" style={pageStyle}>
			<div className="one-page-component" ref={widthRef}>
				<div className="content-box">
					<h3 className="title">1.</h3>
					<div className="selector">
						<p>어떤 목적으로 프로젝트를 모집하세요?</p>
						<SelectAttr name="목적" data={themes} idx={5} getAction={GET_THEME_FOR_CREATE}/>
						<p>어떤 결과를 목표로 하시나요?</p>
						<SelectAttr name="결과물" data={dummyResult} getAction={GET_RESULT_FOR_CREATE} idx={6} />
					</div>
					<button className="next" onClick={ClickNext(0)}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3 className="title">2.</h3>
					<div className="selector">
						<p>모집글 제목을 어떻게 하시겠어요?</p>
						<input name="title" type="text" value={title} onChange={OCTitle} placeholder="제목을 입력해주세요."/>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext(1)}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3 className="title">3.</h3>
					<div className="selector">
						<p>어느 지역에서 진행하시겠어요?</p>
						<SelectAttr name="지역" data={region} getAction={GET_REGION_FOR_CREATE} idx={7}/>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext(2)}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3 className="title">4.</h3>
					<div className="selector">
					{warning === '' ? <p>프로젝트 시작일을 선택해주세요.</p> : <p className="warn">{warning}</p>}
					<div className="setting-box">
							<Calendar
								value={startDate}
								onChange={OCStartDate}
								calendarType="US"
							/>
							<div className="set-period">
							{clickDate &&
								<div className="period-box">
									<div className="highlight period-text">
										<h5>시작</h5>
										<KeyboardArrowRight />
										<span>{moment(startDate).format('YYYY년 MM월 DD일')}</span>
									</div>
									<p>프로젝트 진행 기간을 입력해주세요.</p>
									<div className="period-text period">
										<h5>기간</h5>
										<KeyboardArrowRight/>
										<input value={period} onChange={OCPeriod} maxLength={4} type="text" name="name" pattern="[\d]{4}" autoComplete="off" autoFocus/>
										<p>일</p>
									</div>
								</div>
							}
						</div>
					</div>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext(3)}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3 className="title">5.</h3>
					<div className="selector">
						<p>모집하고 싶은 기술을 가진 사람들을 설정해주세요.</p>
						<div className="setting-box">
							<SetStack stacks={skills} setValue={setStack} />
							<div className="setting-person">
								{stack &&
									<div className="setting">
										<StackBlock name={stack.value} color={stack.color} />
										<input type="number" value={stackNum} onChange={OCStackNum}/>
										<button onClick={set_create_stacks}>
											추가하기
										</button>
									</div>
								}
								<div className="setted-box">
									{
										create_stacks.map((c, i) => {
											return (
												<div className="setted-stack" key={(i)}>
													<StackBlock name={c.value} color={c.color} />
													{c.maxNum}명
													<button onClick={deleteStack(c)}>
														<Close />
													</button>
												</div>
											)
										})
									}
								</div>
								<div className="result">
									<p>총 {create_stacks.reduce((a, b) => a + (b['maxNum'] || 0), 0)}명</p>
								</div>
							</div>
						</div>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext(4)}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3 className="title">6.</h3>
					<div className="selector">
						<p>프로젝트에 대한 자세한 설명을 작성해주세요.</p>
						<Editor editorValue={desc} OCV={setDesc} />
						<button className="back" onClick={ClickBefore}>
							<KeyboardArrowLeft />
						</button>
						<button className="next" onClick={ClickNext(5)}>
							<KeyboardArrowRight />
						</button>
					</div>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3 className="title">마지막 .</h3>
					<div className="selector overflowAuto">
						<p>입력하신 정보가 맞는지 확인해주세요.</p>
						<ProjectPage
							status="create"
							title={title}
							theme={create_theme}
							result={create_result}
							region={create_region}
							startDate={moment(startDate).format("YYYY년 MM월 DD일")}
							period={period}
							stacks={create_stacks}
							desc={desc}
						/>
					</div>
					<button className="proj-create-btn" onClick={createProject}>
							모집 시작
						</button>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
				</div>
			</div>
		</div>
	);
};

CreateProj.propTypes = {

};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	console.log('getserversidepropr');
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
	})
	context.store.dispatch({
		type: LOAD_COMMON_REQUEST,
	})
	const state = context.store.getState()
	if (!state.user.user.subProfile) {
		context.store.dispatch({
			type: OPEN_SUB_PROFILE,
		});
	}

	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default CreateProj;
