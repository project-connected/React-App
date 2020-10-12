import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { END } from "redux-saga";

import wrapper from "../../../store/configureStore";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../../../reducers/user";
import { LOAD_COMMON_REQUEST } from "../../../reducers/common";

import LoadingCircles from "../../../components/LoadingCircles";

const WriteProject = dynamic(import("../../../components/WriteProject"), {
	loading: () => (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#FFF",
			}}
		>
			<LoadingCircles />
		</div>
	),
});

const CreateProj = () => {
	return <WriteProject />;
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
