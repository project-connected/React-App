import React, { useState, useCallback, useRef, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { END } from "redux-saga";

import wrapper from "../../../store/configureStore";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../../../reducers/user";
import { LOAD_COMMON_REQUEST } from "../../../reducers/common";

import { LoadingBox } from "../../../components/LoadingCircles";

const WriteProject = dynamic(
	import("../../../containers/pagesComponent/project/WriteProject"),
	{
		loading: () => <LoadingBox />,
	}
);

const CreateProj = () => {
	return (
		<>
			<Head>
				<title>굿팀 : 프로젝트 모집하기</title>
			</Head>
			<WriteProject />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : "";
		axios.defaults.headers.Cookie = "";
		console.log("getserversidepropr");
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
		});
		context.store.dispatch({
			type: LOAD_COMMON_REQUEST,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default CreateProj;
