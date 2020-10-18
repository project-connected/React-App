import React from "react";
import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import dynamic from "next/dynamic";

import { LOAD_USER_REQUEST } from "../../../reducers/user";
import { LOAD_COMMON_REQUEST } from "../../../reducers/common";

import { LoadingBox } from "../../../components/LoadingCircles";

const WriteJewel = dynamic(
	import("../../../containers/pagesComponent/jewel/WriteJewel"),
	{
		loading: () => <LoadingBox />,
	}
);

const CreateMyAppeal = () => {
	return <WriteJewel />;
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
		context.store.dispatch({
			type: LOAD_COMMON_REQUEST,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

CreateMyAppeal.propTypes = {};

export default CreateMyAppeal;
