import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import dynamic from 'next/dynamic';
import moment from 'moment';
import Router from 'next/router';
import { END } from 'redux-saga';

import wrapper from '../../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../../../reducers/user';

import SelectAttr from '../../../components/buttons/SelectAttr';
import useInput from '../../../hooks/useInput';
import useInputWithSetter from '../../../hooks/useInputWithSetter';
import SetStack from '../../../components/buttons/SetStack';
import StackBlock from '../../../components/StackBlock';

import { KeyboardArrowRight, KeyboardArrowLeft, Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ProjectPage } from '../[index]';
import { LOAD_COMMON_REQUEST } from '../../../reducers/common';
import { OPEN_SUB_PROFILE } from '../../../reducers/component';

export const Editor = dynamic(import ('../../../components/Toast'), {
	ssr: false
});

const CreateHeader = () => {
	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const ref4 = useRef();
	const ref5 = useRef();
	const refFinish = useRef();

	const refArray = [ref1, ref2, ref3, ref4, ref5, refFinish]

	const [indicatorStyle, setIndecatorStyle] = useState({
	});

	const clickBtn = useCallback((elem) => (e) => {
		e.preventDefault();
		console.log(elem.current);
		refArray.forEach((rf) => {
			rf.current.classList.remove('current');
		});

		elem.current.classList.add('current');
		setIndecatorStyle({
			width: elem.current.offsetWidth,
			left: elem.current.offsetLeft,
		})
		console.log(indicatorStyle);
	}, [indicatorStyle]);

	useEffect(() => {
		setIndecatorStyle({
			width: ref1.current.offsetWidth,
			left: ref1.current.offsetLeft,
		})
	}, [])

	return (
		<div id="project-create-header">
			<div className="page-btn current" ref={ref1} onClick={clickBtn(ref1)}>
				1
			</div>
			<div className="page-btn" ref={ref2} onClick={clickBtn(ref2)}>
				2
			</div>
			<div className="page-btn" ref={ref3} onClick={clickBtn(ref3)}>
				3
			</div>
			<div className="page-btn" ref={ref4} onClick={clickBtn(ref4)}>
				4
			</div>
			<div className="page-btn" ref={ref5} onClick={clickBtn(ref5)}>
				5
			</div>
			<div className="page-btn" ref={refFinish} onClick={clickBtn(refFinish)}>
				FINISH
			</div>
			<span className="nav-indicator" style={indicatorStyle}/>
		</div>
	)
}

const CreateProj = () => {
	const widthRef = useRef();
	const [ title, OCTitle ] = useInput('');

	const [createRegion, setCreateRegion] = useState([]);
	const [createTheme, setCreateTheme] = useState([]);
	const [createResult, setCreateResult] = useState([]);
	const [createStacks, setCreateStacks] = useState([]);
	const [selectedStack, setSelectedStack] = useState(null);

	const [stackNum, setStackNum, OCStackNum] = useInputWithSetter(0);
	const [desc, setDesc] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [clickDate, setClickDate] = useState(false);
	const [warning, setWarning] = useState('');
	const [period, setPeriod] = useState(0);
	const [done, setDone] = useState(false);

	const dispatch = useDispatch();

	const { region, skills, themes, results } = useSelector(state=>state.common);
	const { user } = useSelector(state=>state.user)
	const { openSubProfile } = useSelector(state=>state.component);

	const [viewIdx, setViewIdx] = useState(1);
	const slideStyle = {
		transform: `translateX(${(viewIdx-1) * 100 * -1}%)`
	}

	const getCreateRegion = useCallback((data) => {
		setCreateRegion([...createRegion, data]);
	}, [createRegion]);

	const getCreateTheme = useCallback((data) => {
		setCreateTheme([...createTheme, data]);
	}, [createTheme]);

	const getCreateResult = useCallback((data) => {
		setCreateResult([...createResult, data]);
	}, [createResult]);

	const removeTheme = useCallback((data) => (e) => {
		e.preventDefault();
		setCreateTheme(createTheme.filter(v => v.key !== data.key))
	}, [createTheme]);

	const removeResult = useCallback((data) => (e) => {
		e.preventDefault();
		setCreateResult(createResult.filter(v => v.key !== data.key))
	}, [createResult]);

	const removeRegion = useCallback((data) => (e) => {
		e.preventDefault();
		setCreateRegion(createRegion.filter(v => v.key !== data.key))
	}, [createRegion]);

	const ClickNext = useCallback((e) => {
		e.preventDefault();
		console.log(createTheme, createResult, createRegion);
		if (viewIdx === 1) {
			if (createTheme.length === 0 || createResult.length === 0 || createRegion.length === 0)
				return;
		} else if (viewIdx === 2) {
			if (createStacks.length === 0)
				return ;
		} else if (viewIdx === 3) {
			if (period === 0)
				return ;
		} else if (viewIdx === 4) {
			if (title === '')
				return ;
		} else {
			if (desc === '')
				return ;
			else
				setDone(true);
		}
		setViewIdx(viewIdx+1);
	}, [viewIdx, createTheme, createResult, title, createRegion, period, createStacks, desc])

	const ClickBefore = useCallback((e) => {
		e.preventDefault();
		setViewIdx(viewIdx-1);
	}, [viewIdx])

	const set_create_stacks = useCallback((e) => {
		e.preventDefault();
		if (stackNum > 0) {
			setCreateStacks([...createStacks, {
				key: selectedStack.key,
				color: selectedStack.color,
				value: selectedStack.value,
				num: 0,
				maxNum: Number(stackNum)
			}])
			setSelectedStack(null);
			setStackNum(0);
		}
	}, [createStacks, stackNum])

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

	const createProject = useCallback((e) => {
		e.preventDefault();
		console.log('만들기!');
		// dispatch
	})

	const selectStack = useCallback((stack) => {
		setSelectedStack(stack);
	}, []);

	return (
		<>
		<CreateHeader />
		<div id="create-wrap">
			<div className="one-page-component" style={slideStyle} ref={widthRef}>
				<div className="content-box">
					<h3 className="title">1.</h3>
					<div className="selector">
						<p>어떤 목적으로 프로젝트를 모집하세요?</p>
						<SelectAttr name="목적" data={themes} value={createTheme} idx={5} getAction={getCreateTheme}/>
						<p>어떤 결과를 목표로 하시나요?</p>
						<SelectAttr name="결과물" data={results} value={createResult} getAction={getCreateResult} idx={6} />
						<p>어느 지역에서 진행하시겠어요?</p>
						<SelectAttr name="지역" data={region} value={createRegion} getAction={getCreateRegion} idx={7}/>
					</div>
					<button className="next" onClick={ClickNext}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component" style={slideStyle}>
				<div className="content-box">
					<h3 className="title">2.</h3>
					<div className="selector">
						<p>모집하고 싶은 기술을 가진 사람들을 설정해주세요.</p>
						<div className="setting-box">

						</div>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component" style={slideStyle}>
				<div className="content-box">
					<h3 className="title">3.</h3>
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
					<button className="next" onClick={ClickNext}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component" style={slideStyle}>
				<div className="content-box">
					<h3 className="title">4.</h3>
					<div className="selector">
						<p>모집글 제목을 어떻게 하시겠어요?</p>
						<input name="title" type="text" value={title} onChange={OCTitle} placeholder="제목을 입력해주세요."/>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component" style={slideStyle}>
				<div className="content-box">
					<h3 className="title">5.</h3>
					<div className="selector">
						<p>프로젝트에 대한 자세한 설명을 작성해주세요.</p>
						<Editor editorValue={desc} OCV={setDesc} />
						<button className="back" onClick={ClickBefore}>
							<KeyboardArrowLeft />
						</button>
						<button className="next" onClick={ClickNext}>
							<KeyboardArrowRight />
						</button>
					</div>
				</div>
			</div>
			<div className="one-page-component" style={slideStyle}>
				<div className="content-box">
					<h3 className="title">마지막 .</h3>
					<div className="selector overflowAuto">
						<p>입력하신 정보가 맞는지 확인해주세요.</p>
						{done && <ProjectPage
							status="create"
							title={title}
							theme={createTheme}
							result={createResult}
							region={createRegion}
							startDate={moment(startDate).format("YYYY년 MM월 DD일")}
							period={period}
							stacks={createStacks}
							desc={desc}
						/>}
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
		</>
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
