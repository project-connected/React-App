import axios from 'axios';
import { call, all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE
} from '../reducers/user';

const dummyUser = {
	email: 'anhs0220@gmail.com',
	name: '안홍섭',
	profileImg: 'https://media.vlpt.us/images/yujo/profile/053c9bee-1076-418c-808d-f9a1b88dc445/KakaoTalk_20200229_162658088.jpg?w=240',
}

function loginAPI(loginData) {
	return { data: dummyUser };
}

function* login(action) {
	try {
		const result = yield call(loginAPI, action.data);
		yield delay(1000);
		yield put({
			type: LOGIN_SUCCESS,
			data: result.data,
		})
	} catch(e) {
		yield put({
			type: LOGIN_FAILURE,
			error: e.reponse.error,
		})
	}
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, login);
}

function logoutAPI(loginData) {
	return null;
}

function* logout(action) {
	try {
		const result = yield call(logoutAPI, action.data);
		yield put({
			type: LOGOUT_SUCCESS,
		})
	} catch(e) {
		yield put({
			type: LOGOUT_FAILURE,
			error: e.reponse.error,
		})
	}
}

function* watchLogout() {
	yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* userSaga(){
	yield all([
		fork(watchLogin),
		fork(watchLogout),
	]);
}
