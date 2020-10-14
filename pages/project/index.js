import React from "react";
import axios from "axios";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import Head from "next/head";

import wrapper from "../../store/configureStore";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import { LOAD_COMMON_REQUEST } from "../../reducers/common";
import { OPEN_SUB_PROFILE } from "../../reducers/component";
import { LoadingBox } from "../../components/LoadingCircles";

const SearchProject = dynamic(
	import("../../containers/pagesComponent/project/SearchProject"),
	{
		loading: () => <LoadingBox />,
	}
);

const SearchProj = () => {
	return (
		<>
			<Head>
				<title>굿팀 : 프로젝트 검색</title>
			</Head>
			<SearchProject />
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
		const state = context.store.getState();
		// context.store.dispatch({
		// 	type: LOAD_USER_REQUEST,
		// });
		// context.store.dispatch({
		// 	type: LOAD_COMMON_REQUEST,
		// });
		if (!state.user.theme)
			context.store.dispatch({
				type: OPEN_SUB_PROFILE,
			});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default SearchProj;
