import React from "react";
import dynamic from "next/dynamic";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

import { LOAD_USER_REQUEST } from "../../reducers/user";
import { LOAD_COMMON_REQUEST } from "../../reducers/common";
import { LoadingBox } from "../../components/LoadingCircles";

const EditProfile = dynamic(
	import("../../containers/pagesComponent/user/EditProfile"),
	{
		loading: () => <LoadingBox />,
	}
);

const Profile = () => {
	return <EditProfile />;
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

export default Profile;
