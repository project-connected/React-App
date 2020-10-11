import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import { END } from 'redux-saga';
import { HowToVoteOutlined, Chat } from '@material-ui/icons';

import wrapper from '../../store/configureStore';
import { OPEN_APPLY, OPEN_USER_MENU } from '../../reducers/component';
import { LOAD_USER_REQUEST } from '../../reducers/user';

import StackBlock from '../../components/StackBlock';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';

const dummyStack = [
	{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	}, {
		name: 'photoshop',
		color: '#187bcd',
		num: 1,
		maxNum: 2,
	}, {
		name: 'React.JS',
		color: '#03254c',
		num: 1,
		maxNum: 2,
	}, {
		name: 'Swift',
		color: '#FC6A03',
		num: 1,
		maxNum: 2,
	}
];

export const InfoBlock = ({ name, data }) => {
	return (
		<div className="info-block">
			<span className="block-name">{name}</span>
			<span>{data}</span>
		</div>
	);
}

export const ProjectPage = ({ data=null, status='view' }) => {
	const { user } = useSelector(state=>state.user);
	const { projectData } = useSelector(state=>state.project);
	const dispatch = useDispatch();

	const [PJData, setPJData] = useState(data ? data : projectData);

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
		<div id='project-page-wrap'>
			<div className="proj-head-info boxShadow">
				<div className="proj-head-title">
					<h3>{PJData.title}</h3>
				</div>
				<div className="proj-info-container">
					<section id="condition">
						<div className="info-box">
							<p>프로젝트 테마</p>
							<div className="block-wrap overDisplay">
								{PJData.theme.map((c, i) => {
									return (
										<div key={(i)} className="block">
											{c.value}
										</div>
									)
								})}
							</div>
						</div>
						<div className="info-box">
							<p>프로젝트 결과물</p>
							<div className="block-wrap overDisplay">
								{PJData.result.map((c, i) => {
									return (
										<div key={(i)} className="block">
											{c.value}
										</div>
									)
								})}
							</div>
						</div>
						<div className="info-box">
							<p>프로젝트 진행 지역</p>
							<div className="block-wrap overDisplay">
								{PJData.region.map((c, i) => {
									return (
										<div key={(i)} className="block">
											{c.value}
										</div>
									)
								})}
							</div>
						</div>
					</section>
					<section id="stack">
						<div className="info-box">
							<p>프로젝트 진행 기간</p>
							<div className="block-wrap period">
								<div className="block">
									{PJData.period.startDate}
								</div>
								<p>부터 <span>{PJData.period.diff}</span>일 간</p>
							</div>
						</div>
						<div className="info-box stack">
							<p>모집기술</p>
							<p className="total-num">{PJData.stacks.reduce((a, b) => a + (b['num'] || 0), 0)} / {projectData.stacks.reduce((a, b) => a + (b['maxNum'] || 0), 0)}명</p>
							<div className="project-card-stack-block-wrap">
								{PJData.stacks.map((c, i) => {
									return (
										<div key={(i)} className="proj-stack-block">
											<StackBlock name={c.value} color={c.color} />
											<span className="proj-stack-person">
												{c.num}/{c.maxNum} 명
											</span>
										</div>
									)
								})}
							</div>
						</div>
					</section>
				</div>
			</div>
			{ status === 'view' &&
				<div className="proj-button-wrap">
					<button id="apply" onClick={applyProj} >
						<HowToVoteOutlined/>
						<h3>
							APPLY
						</h3>
					</button>
					<button id="listup">
						<Chat />
						<h3>MESSAGE</h3>
					</button>
				</div>
			}
			<div className="proj-descript boxShadow">
				<ReactMarkdown source={PJData.description} />
			</div>
		</div>
	);
};

const Project = () => {
	const dispatch = useDispatch();

	return (
		<>
		<Head>
			<title>프로젝트</title>
		</Head>
		<ProjectPage/>
		</>
	)
}

 Project.propTypes = {

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

export default Project;
