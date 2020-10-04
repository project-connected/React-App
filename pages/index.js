import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

import JewelCard from '../components/JewelCard';

import { LOAD_USER_REQUEST } from '../reducers/user';

const Index = () => {
	const { projectList } = useSelector(state=>state.project);
	const { jewels } = useSelector(state=>state.jewel);

	return (
		<>
		<div id="main-header">
			헤더 메세지
		</div>
		<div className="main-page-card-div">
			<div className="card-list">
				<div className="card-box">
					인재 수, 홍보
				</div>
				{ jewels.map((c, i) => {
					return (
						<Link href={`/jewel/2`} key={(i)}>
							<a>
								<JewelCard data={c} />
							</a>
						</Link>
					)
				})}
				<div className="card-box">
					더보기 버튼
				</div>
			</div>
		</div>
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
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Index;
