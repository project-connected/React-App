import axios from 'axios';
import { call, all, fork, takeLatest, put, delay } from 'redux-saga/effects';
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
	SAVE_SUBPROFILE_FAILURE,
	UPLOAD_PROFILE_IMAGE_REQUEST,
	UPLOAD_PROFILE_IMAGE_SUCCESS,
	UPLOAD_PROFILE_IMAGE_FAILURE,
} from '../reducers/user';

function loadUserAPI() {
	return axios.get('/auth/user');
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
	return axios.post('/auth/local/login', loginData, {
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

function logoutAPI() {
	document.cookie =
		'authorization' +
		'=' +
		('.anjoy.info' ? ';domain=' + '.anjoy.info' : '') +
		';expires=Thu, 01 Jan 1970 00:00:01 GMT';
	return null;
}

function* logout(action) {
	try {
		const result = yield call(logoutAPI);
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
	return axios.post('/user', signupData);
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
	return axios.put(`/user/${data.userId}`, data);
}

function* saveProfile(action) {
	try {
		const result = yield call(saveProfileAPI, action.data);
		yield delay(2000);
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
	return axios.post('/file/thumb', dataForm);
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
