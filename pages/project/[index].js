import React, { useCallback } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { OPEN_APPLY, OPEN_USER_MENU } from '../../reducers/component';

import StackBlock from '../../components/StackBlock';

const dummyStack = [
	{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
	}, {
		name: 'photoshop',
		color: '#187bcd',
	}, {
		name: 'React.JS',
		color: '#03254c',
	}, {
		name: 'Swift',
		color: '#FC6A03',
	}
];

const InfoBlock = ({ name, data }) => {
	return (
		<div className="info-block">
			<span className="block-name">{name}</span>
			<span>{data}</span>
		</div>
	);
}

const Project = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state=>state.user);

	const applyProj = useCallback((e) => {
		if (!user) {
			alert('로그인이 필요해요.');
			dispatch({
				type: OPEN_USER_MENU,
			})
		} else {
			dispatch({
				type: OPEN_APPLY,
			})
		}
	}, [user]);

	return (
		<>
		<Head>
			<title>프로젝트</title>
		</Head>
		<div id='project-page-wrap'>
			<h1>프로젝트 정보</h1>
			<div className="proj-head-info">
				<div className="proj-head-title">
					<p>테마</p>
					<h3>프로젝트 제목</h3>
				</div>
				<div className="proj-info-container">
					<section id="condition">
						<h6>모집정보</h6>
						<InfoBlock name="주제" data="너무 재밌는 프로젝트" />
						<InfoBlock name="지역" data="지구촌 어디든" />
						<InfoBlock name="기간" data="내가 죽는 날까지" />
						<InfoBlock name="테마" data="웹페이지 개발" />
						<InfoBlock name="인원" data="39102명" />
					</section>
					<section id="stack">
						<h6>모집기술</h6>
						<p>2/6명</p>
						<div className="project-card-stack-block-wrap">
							{dummyStack.map((c, i) => {
								return (
									<div key={(i)} className="proj-stack-block">
										<StackBlock name={c.name} color={c.color} />
										<span className="proj-stack-person">
											1/2명
										</span>
									</div>
								)
							})}
						</div>
					</section>
				</div>
			</div>
			<div className="proj-button-wrap">
				<button id="apply" onClick={applyProj} >신청하기</button>
				<button id="listup">관심등록</button>
			</div>
			<div>
				descript
			</div>
		</div>
		</>
	);
};
 Project.propTypes = {

};

export default Project;
