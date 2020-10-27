import axios from 'axios';
import { call, all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
	LOAD_JEWEL_REQUEST,
	LOAD_JEWEL_SUCCESS,
	LOAD_JEWEL_FAILURE,
	CREATE_JEWEL_REQUEST,
	CREATE_JEWEL_SUCCESS,
	CREATE_JEWEL_FAILURE,
	UPDATE_JEWEL_REQUEST,
	UPDATE_JEWEL_SUCCESS,
	UPDATE_JEWEL_FAILURE,
	LOAD_JEWEL_LIST_REQUEST,
	LOAD_JEWEL_LIST_SUCCESS,
	LOAD_JEWEL_LIST_FAILURE,
	FILTER_JEWEL_LIST_REQUEST,
	FILTER_JEWEL_LIST_SUCCESS,
	FILTER_JEWEL_LIST_FAILURE,
} from '../reducers/jewel';

const dummy = {
	id: 1,
	userId: 1,
	user: {
		userId: 1,
		userName: 'han',
		profileImg:
			'https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg',
	},
	theme: {
		key: 'HACKERTON',
		value: '해커톤',
	},
	region: {
		key: 'SEOUL',
		value: '서울',
	},
	result: {
		key: 'APPLICATION',
		value: '어플리케이션 개발',
	},
	period: {
		startDate: 'Mon Sep 07 2020 06:26:32 GMT+0900 (대한민국 표준시)',
		endDate: 'Mon Sep 14 2020 06:26:32 GMT+0900 (대한민국 표준시)',
	},
	stacks: [
		{
			key: 'REACT',
			value: 'React.JS',
			color: 'rgb(65, 169, 75)',
		},
		{
			key: 'NODE',
			value: 'Node.JS',
			color: 'rgb(65, 169, 75)',
		},
	],
	title: '전 대단한 사람입니다.',
	desc: '# test ## test ### test',
};

function loadJewelAPI(jewelId) {
	return axios.get(`/profiles/${jewelId}`);
}

function* loadJewel(action) {
	try {
		const result = yield call(loadJewelAPI, action.id);
		yield put({
			type: LOAD_JEWEL_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: LOAD_JEWEL_FAILURE,
			error: e.response.data.message,
		});
	}
}

function* watchLoadJewel() {
	yield takeLatest(LOAD_JEWEL_REQUEST, loadJewel);
}

function updateJewelAPI(data) {
	return axios.post(`/profiles/${data.jewelId}`, data.jewelData);
}

function* updateJewel(action) {
	try {
		const result = yield call(updateJewelAPI, action.data);
		yield put({
			type: UPDATE_JEWEL_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: UPDATE_JEWEL_FAILURE,
			error: e.response.data.message,
		});
	}
}

function* watchUpdateJewel() {
	yield takeLatest(UPDATE_JEWEL_REQUEST, updateJewel);
}
function createJewelAPI(data) {
	return axios.post(`/profiles`, data);
}

function* createJewel(action) {
	try {
		const result = yield call(createJewelAPI, action.data);
		yield put({
			type: CREATE_JEWEL_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: CREATE_JEWEL_FAILURE,
			error: e.response.data.message,
		});
	}
}

function* watchCreateJewel() {
	yield takeLatest(CREATE_JEWEL_REQUEST, createJewel);
}

function loadJewelListAPI() {
	return axios.post(`/profiles/list`);
}

function* loadJewelList(action) {
	try {
		const result = yield call(loadJewelListAPI, action.data);
		yield put({
			type: LOAD_JEWEL_LIST_SUCCESS,
			data: result.data.result,
		});
	} catch (e) {
		yield put({
			type: LOAD_JEWEL_LIST_FAILURE,
			error: e,
		});
	}
}

function* watchLoadJewelList() {
	yield takeLatest(LOAD_JEWEL_LIST_REQUEST, loadJewelList);
}

function filterJewelListAPI(data) {
	return axios.post('/profiles/list', {
		area: data.area,
		skill: data.skill,
		theme: data.theme,
		purpose: data.purpose,
		startDate: data.startDate,
	});
}

function* filterJewelList(action) {
	try {
		const result = yield call(filterJewelListAPI, action.data);
		console.log(result);
		yield put({
			type: FILTER_JEWEL_LIST_SUCCESS,
			data: result.data.result,
		});
	} catch (e) {
		yield put({
			type: FILTER_JEWEL_LIST_FAILURE,
			error: e,
		});
	}
}

function* watchFilterJewelList() {
	yield takeLatest(FILTER_JEWEL_LIST_REQUEST, filterJewelList);
}

export default function* jewelSaga() {
	yield all([
		fork(watchLoadJewel),
		fork(watchCreateJewel),
		fork(watchUpdateJewel),
		fork(watchLoadJewelList),
		fork(watchFilterJewelList),
	]);
}
