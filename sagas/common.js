import axios from 'axios';
import { call, all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import { LOAD_COMMON_REQUEST, LOAD_COMMON_SUCCESS, LOAD_COMMON_FAILURE } from '../reducers/common';

function loadCommonDataAPI() {
	return axios.get('/common/all');
}

function* loadCommonData() {
	try {
		console.log('in sages');
		const result = yield call(loadCommonDataAPI);
		yield put({
			type: LOAD_COMMON_SUCCESS,
			data: result.data.result,
		})
	} catch(e) {
		yield put({
			type: LOAD_COMMON_FAILURE,
		})
	}
}

function* watchLoadCommonData() {
	yield takeLatest(LOAD_COMMON_REQUEST, loadCommonData);
}

export default function* commonSaga(){
	yield all([
		fork(watchLoadCommonData),
	]);
}
