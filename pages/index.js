import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

import { Visibility } from "@material-ui/icons";
import StackBlock from '../components/StackBlock';
import { useDispatch } from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_COMMON_REQUEST } from '../reducers/common';

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
	}, {
		name: 'photoshop',
		color: '#187bcd',
	}, {
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
	}, {
		name: 'React.JS',
		color: '#03254c',
	}, {
		name: 'Swift',
		color: '#FC6A03',
	},
];

const ProjectCard = ({ idx }) => {
	return (
		<Link href="/project/[id]" as={`/project/${idx}`} prefetch={false}>
			<a className="project-card">
				<div className="project-card-img-container">
					<img src="https://cdn.inflearn.com/wp-content/uploads/react.png" />
				</div>
				<div className="project-card-info">
					<div className="project-card-line">
						<h3>프로젝트 제목</h3>
					</div>
					<div className="project-card-line">
						<span>헤커톤</span>
						<span>6 month</span>
						<span>2명 / 5명</span>
					</div>
					<p>
					discriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscription
					</p>
				</div>
				<div className="project-card-stack-block-wrap">
					{dummyStack.map((c, i) => {
						return (
							<StackBlock key={(i)} name={c.name} color={c.color} />
						);
					})}
				</div>
				<div className="project-card-footer">
					<div className="project-card-view">
						<Visibility />
						<span>20</span>
					</div>
				</div>
			</a>
		</Link>
	);
}

const MainPage = () => {
	const dummy = [1,2,3,4,5,6];

	const dispatch = useDispatch();

	return (
		<div className="main-page-wrap">
			<h1>현재 모집 중인 프로젝트</h1>
			<div className="project-card-container">
				{dummy.map((i) => {
					return (
						<ProjectCard key={(i)} idx={i}/>
					)
				})}
			</div>
		</div>
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


MainPage.propTypes = {

};

export default MainPage;
