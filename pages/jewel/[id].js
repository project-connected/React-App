import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { END } from "redux-saga";

import { LoadingBox } from "../../components/LoadingCircles";
import wrapper from "../../store/configureStore";
import { LOAD_JEWEL_REQUEST } from "../../reducers/jewel";
import { LOAD_COMMON_REQUEST } from "../../reducers/common";
import { LOAD_USER_REQUEST } from "../../reducers/user";

const JewelPage = dynamic(
	import("../../containers/pagesComponent/jewel/JewelPage"),
	{
		loading: () => <LoadingBox />,
	}
);

const Jewel = () => {
	return <JewelPage />;
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
		context.store.dispatch({
			type: LOAD_JEWEL_REQUEST,
			id: context.params.id,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Jewel;
