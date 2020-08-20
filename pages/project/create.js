import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import dynamic from 'next/dynamic';
import moment from 'moment';
import ReactMarkdown from "react-markdown";

import {
	GET_PRIOD_FOR_CREATE, GET_STACK_FOR_CREATE, GET_REGION_FOR_CREATE, GET_THEME_FOR_CREATE, GET_RESULT_FOR_CREATE, DELETE_STACK_FOR_CREATE
} from '../../reducers/project';

import SelectAttr from '../../components/buttons/SelectAttr';
import useInput from '../../hooks/useInput';
import useInputWithSetter from '../../hooks/useInputWithSetter';
import SetStack from '../../components/buttons/SetStack';
import StackBlock from '../../components/StackBlock';

import { KeyboardArrowRight, KeyboardArrowLeft, Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

const Editor = dynamic(import ('../../components/Toast'), {
	ssr: false
})

const CreateProj = props => {
	const widthRef = useRef();
	const [width, setWidth] = useState(0);
	const [pageOffset, setPageOffset] = useState('');
	const [ title, OCTitle ] = useInput('');
	const [stack, setStack] = useState(null);
	const [stackNum, setStackNum, OCStackNum] = useInputWithSetter(0);
	const [desc, setDesc] = useState('');
	const [startDate, setStartDate] = useState();
	const [clickDate, setClickDate] = useState(false);
	const [warning, setWarning] = useState('');
	const [period, setPeriod] = useState(0);

	const { create_stacks } = useSelector(state=>state.project);
	const dispatch = useDispatch();

	const pageStyle = {
		transform: `translateX(${pageOffset}px`
	}

	const ClickNext = useCallback((e) => {
		e.preventDefault();
		setPageOffset(pageOffset - width)
	}, [pageOffset, width])

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
					name: stack.name,
					color: stack.color,
					num: Number(stackNum),
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
		setWidth(widthRef.current.offsetWidth);
	}, [widthRef, width]);

	useEffect(() => {
		setStartDate(new Date());
	}, [])

	return (
		<div id="proj-create-wrap" style={pageStyle}>
			<div className="one-page-component" ref={widthRef}>
				<div className="content-box">
					<h3>1.</h3>
					<div className="selector">
						<p>어떤 목적으로 프로젝트를 모집하세요?</p>
						<SelectAttr name="목적" data={["헤커톤", "공모전", "취미", "스터디"]} idx={4} getAction={GET_THEME_FOR_CREATE}/>
						<p>어떤 결과를 목표로 하시나요?</p>
						<SelectAttr name="결과물" data={["어플리케이션 개발", "웹 개발", "API 개발", "스터디", "기타"]} getAction={GET_RESULT_FOR_CREATE} idx={5} />
					</div>
					<button className="next" onClick={ClickNext}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3>2.</h3>
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
			<div className="one-page-component">
				<div className="content-box">
					<h3>3.</h3>
					<div className="selector">
						<p>어느 지역에서 진행하시겠어요?</p>
						<SelectAttr name="지역" data={["서울", '대전', '대구', '부산', '찍고', '아하']} getAction={GET_REGION_FOR_CREATE} idx={6}/>
					</div>
					<button className="back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
					<button className="next" onClick={ClickNext}>
						<KeyboardArrowRight />
					</button>
				</div>
			</div>
			<div className="one-page-component">
				<div className="content-box">
					<h3>4.</h3>
					<div className="selector">
					{warning === '' ? <p>프로젝트 시작일을 선택해주세요.</p> : <p className="warn">{warning}</p>}
					<div className="setting-box">
							<Calendar
								value={startDate}
								onChange={OCStartDate}
							/>
							<div className="set-period">
							{clickDate &&
								<div className="period-box">
									<div className="highlight period-text">
										<h5>시작<KeyboardArrowRight /></h5>
										<span>{moment(startDate).format('YYYY년 MM월 DD일')}</span>
									</div>
									<p>프로젝트 진행 기간을 입력해주세요.</p>
									<div className="period-text period">
										<h5>기간<KeyboardArrowRight/></h5>
										<input value={period} onChange={OCPeriod} maxLength={4} placeholder="9999" type="text" name="name" pattern="[\d]{4}" autoComplete="off" autofocus/>
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
			<div className="one-page-component">
				<div className="content-box">
					<h3>5.</h3>
					<div className="selector">
						<p>모집하고 싶은 기술을 가진 사람들을 설정해주세요.</p>
						<div className="setting-box">
							<SetStack value={stack} setValue={setStack} />
							<div className="setting-person">
								{stack &&
									<div className="setting">
										<StackBlock name={stack.name} color={stack.color} />
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
													<StackBlock name={c.name} color={c.color} />
													{c.num}명
													<button onClick={deleteStack(c)}>
														<Close />
													</button>
												</div>
											)
										})
									}
								</div>
								<div className="result">
									<p>총 {create_stacks.reduce((a, b) => a + (b['num'] || 0), 0)}명</p>
								</div>
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
			<div className="one-page-component">
				<div className="content-box">
					<h3>6.</h3>
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
			<div className="one-page-component">
				<div className="content-box">
					<h3>마지막 .</h3>
					<ReactMarkdown source={desc} />
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

export default CreateProj;
