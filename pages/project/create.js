import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

import {
	GET_PRIOD_FOR_CREATE, GET_STACK_FOR_CREATE, GET_REGION_FOR_CREATE, GET_THEME_FOR_CREATE, GET_RESULT_FOR_CREATE
} from '../../reducers/project';

import SelectAttr from '../../components/buttons/SelectAttr';
import useInput from '../../hooks/useInput';
import useInputWithSetter from '../../hooks/useInputWithSetter';
import SetStack from '../../components/buttons/SetStack';
import StackBlock from '../../components/StackBlock';

import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@material-ui/core';

const dummyRegion = [
	{
		main: "서울",
		sub: null,
	},{
		main: "부산",
		sub: null,
	},{
		main: "대구",
		sub: null,
	},{
		main: "인천",
		sub: null,
	},{
		main: "광주",
		sub: null,
	},{
		main: "대전",
		sub: null,
	},{
		main: "울산",
		sub: null,
	},{
		main: "제주",
		sub: null,
	},
	{
		main: "경기",
		sub: ["수원", "성남", "안양", "안산", "용인", "부천", "광명", "평택", "과천", "오산", "시흥", "군포", "의왕", "하남", "이천", "안성", "김포", "화성", "광주", "여주", "양평", "일산", "고양", "의정부", "구리", "남양주", "파주", "양주", "동두천", "포천", "가평"],
	},
	{
		main: "강원",
		sub: ["춘천", "원주", "강릉", "동해", "태백", "속초", "삼척", "홍천", "횡성", "영월", "평창", "정선", "철원", "화천", "양구", "인제", "고성", "양양"],
	},
	{
		main: "충북",
		sub: ["", ],
	},
	{
		main: "충남",
		sub: ["", ],
	},
	{
		main: "전북",
		sub: ["", ],
	},
	{
		main: "전남",
		sub: ["", ],
	},
	{
		main: "경북",
		sub: ["", ],
	},
	{
		main: "경남",
		sub: ["", ]
	},
	{
		main: "",
		sub: ["", ]
	}
];


const Ipt = ({name, val, OCF}) => {
	return (
		<div className="ipt-line">
			<div>
				{name}
			</div>
			<input value={val} onChange={OCF} placeholder={`${name} 을 입력하세요.`}/>
		</div>
	)
}

const CreateProj = props => {
	const widthRef = useRef();
	const [width, setWidth] = useState(0);
	const [pageOffset, setPageOffset] = useState('');
	const [ title, OCTitle ] = useInput('');
	const [stack, setStack] = useState(null);
	const [stackNum, setStackNum, OCStackNum] = useInputWithSetter(0);

	const { create_stacks } = useSelector(state=>state.project);
	const dispatch = useDispatch();

	const pageStyle = {
		transform: `translateX(${pageOffset}px`
	}

	const ClickNext = useCallback((e) => {
		e.preventDefault();
		setPageOffset(pageOffset - width)
		console.log(pageOffset)
	}, [pageOffset, width])

	const ClickBefore = useCallback((e) => {
		e.preventDefault();
		setPageOffset(pageOffset + width)
		console.log(pageOffset)
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

	useEffect(() => {
		setWidth(widthRef.current.offsetWidth);
		console.log(widthRef.current.offsetWidth);
	}, [widthRef, width]);

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
					<div className="selector">
						<p>모집하고 싶은 기술을 가진 사람들을 설정해주세요.</p>
						<div className="setting-stack-box">
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
				discription
				<button className="back" onClick={ClickBefore}>
					<KeyboardArrowLeft />
				</button>
				<button className="next" onClick={ClickNext}>
					<KeyboardArrowRight />
				</button>
			</div>
			<div className="one-page-component">
				입력 정보 확인, 만들기 버튼
				<button className="back" onClick={ClickBefore}>
					<KeyboardArrowLeft />
				</button>
			</div>
		</div>
	);
};

CreateProj.propTypes = {

};

export default CreateProj;


// 지역 ( + 온라인)
// 기간 - 캘린더로 선택
// 주제
// 테마 - list
// 최대인원 -> 테이블과 연결
// 테이블 (스택, 인원) -> 최대인원으로 자동 합
// 프로젝트 설명(텍스트)
