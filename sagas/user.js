import axios from "axios";
import { call, all, fork, takeLatest, put, delay } from "redux-saga/effects";
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILURE,
	SAVE_SUBPROFILE_REQUEST,
	SAVE_SUBPROFILE_SUCCESS,
	UPLOAD_PROFILE_IMAGE_REQUEST,
	UPLOAD_PROFILE_IMAGE_SUCCESS,
	UPLOAD_PROFILE_IMAGE_FAILURE,
} from "../reducers/user";

const dummyUser = {
	email: "anhs0220@gmail.com",
	name: "안홍섭",
	profileImg:
		"https://media.vlpt.us/images/yujo/profile/053c9bee-1076-418c-808d-f9a1b88dc445/KakaoTalk_20200229_162658088.jpg?w=240",
};

function loadUserAPI() {
	return axios.get("/auth/user");
}

function* loadUser() {
	try {
		const result = yield call(loadUserAPI);
		console.log(result.headers);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		console.error(e);
		yield put({
			type: LOAD_USER_FAILURE,
			// error: e.response.error,
		});
	}
}

function* watchLoadUser() {
	yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function loginAPI(loginData) {
	return axios.post("/auth/local/login", loginData, {
		withCredentials: true,
	});
}

function* login(action) {
	try {
		const result = yield call(loginAPI, action.data);
		yield put({
			type: LOGIN_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: LOGIN_FAILURE,
			error: e.response.data.message,
		});
	}
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, login);
}

function logoutAPI(loginData) {
	document.cookie =
		"authorization" +
		"=" +
		(".anjoy.info" ? ";domain=" + ".anjoy.info" : "") +
		";expires=Thu, 01 Jan 1970 00:00:01 GMT";
	return null;
}

function* logout(action) {
	try {
		const result = yield call(logoutAPI, action.data);
		yield put({
			type: LOGOUT_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: LOGOUT_FAILURE,
		});
	}
}

function* watchLogout() {
	yield takeLatest(LOGOUT_REQUEST, logout);
}

function signupAPI(signupData) {
	return axios.post("/user", signupData);
}

function* signup(action) {
	try {
		const result = yield call(signupAPI, action.data);
		yield put({
			type: SIGNUP_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: SIGNUP_FAILURE,
			error: e.response.data,
		});
	}
}

function* watchSignup() {
	yield takeLatest(SIGNUP_REQUEST, signup);
}

function saveProfileAPI(data) {
	return {
		data: {
			result: {
				userId: 1,
				email: "anhs0220@gmail.com",
				userName: "Forty Two Seoul",
				area: data.area,
				skill: data.skill,
				theme: data.theme,
				purpose: data.purpose,
				url: data.url,
				introduct: data.introduct,
			},
		},
	};
	//return axios.post('/', data);
}

function* saveProfile(action) {
	try {
		const result = yield call(saveProfileAPI, action.data);
		yield put({
			type: SAVE_SUBPROFILE_SUCCESS,
			data: result.data.result,
		});
	} catch (e) {
		yield put({
			type: SAVE_SUBPROFILE_FAILURE,
			error: e.response.data,
		});
	}
}

function* watchSaveProfile() {
	yield takeLatest(SAVE_SUBPROFILE_REQUEST, saveProfile);
}

function uploadProfileImageAPI(dataForm) {
	// console.log(dataForm);
	// return {
	// 	data: {
	// 		result:
	// 			"https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg",
	// 	},
	// };
	return axios.post("/file/thumb", dataForm);
}

function* uploadProfileImage(action) {
	try {
		const result = yield call(uploadProfileImageAPI, action.data);
		console.log(result);
		yield delay(1000);
		yield put({
			type: UPLOAD_PROFILE_IMAGE_SUCCESS,
			data: result.data.result.location,
		});
	} catch (e) {
		yield put({
			type: UPLOAD_PROFILE_IMAGE_FAILURE,
			error: e.response.data,
		});
	}
}

function* watchUploadProfileImage() {
	yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

export default function* userSaga() {
	yield all([
		fork(watchLogin),
		fork(watchLoadUser),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchSaveProfile),
		fork(watchUploadProfileImage),
	]);
}
