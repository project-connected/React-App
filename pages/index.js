import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

import JewelCard from "../components/JewelCard";

import { LOAD_USER_REQUEST } from "../reducers/user";
import CountUp from "react-countup";

const Index = () => {
	const { projectList } = useSelector((state) => state.project);
	const { jewels } = useSelector((state) => state.jewel);

	return (
		<>
			<div id="main-cards">
				<Link href="/project">
					<a
						className="card-box intro"
						style={{
							backgroundImage: "url(/images/project.png)",
							backgroundSize: "cover",
							backgroundPositionX: "center",
						}}
					>
						<CountUp className="countUp" end={361} duration={3} />
						<p>프로젝트가 인재를 모집 중입니다.</p>
					</a>
				</Link>
				<Link href="/jewel">
					<a
						className="card-box intro"
						style={{
							backgroundImage: "url(/images/jewel.jpg)",
							backgroundSize: "cover",
							backgroundPositionX: "center",
						}}
					>
						<CountUp className="countUp" end={1378} duration={3} />
						<p>명의 인재가 팀원을 찾고 있습니다.</p>
					</a>
				</Link>
			</div>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : "";
		axios.defaults.headers.Cookie = "";
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Index;
