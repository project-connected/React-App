import axios from 'axios';
import { call, all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
	LOAD_JEWEL_REQUEST,
	LOAD_JEWEL_SUCCESS,
	LOAD_JEWEL_FAILURE,
} from '../reducers/jewel';

const dummy = {
	id: 1,
	userId: 1,
	user: {
		userId: 1,
		userName: 'han',
		profileImg: 'https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg',
	},
	theme: {
		key: 'HACKERTON',
		value: '해커톤'
	},
	region: {
		key: 'SEOUL',
		value: '서울'
	},
	result: {
		key: 'APPLICATION',
		value: '어플리케이션 개발'
	},
	period: {
		startDate: 'Mon Sep 07 2020 06:26:32 GMT+0900 (대한민국 표준시)',
		endDate: 'Mon Sep 14 2020 06:26:32 GMT+0900 (대한민국 표준시)',
	},
	stacks: [{
		key: 'REACT',
		value: 'React.JS',
		color: 'rgb(65, 169, 75)'
	},{
		key: 'NODE',
		value: 'Node.JS',
		color: 'rgb(65, 169, 75)'
	}],
	title: '전 대단한 사람입니다.',
	desc: '# test ## test ### test'
}

function loadJewelAPI(jewelId) {
	return {data: dummy}
}

function* loadJewel(action) {
	try {
		const result = yield call(loadJewelAPI, action.data);
		yield put({
			type: LOAD_JEWEL_SUCCESS,
			data: result.data
		})
	} catch(e){
		yield put({
			type: LOAD_JEWEL_FAILURE,
			// error: e.response.error
		})
	}
}

function* watchLoadJewel() {
	yield takeLatest(LOAD_JEWEL_REQUEST, loadJewel)
}

export default function* jewelSaga(){
	yield all([
		fork(watchLoadJewel),
	]);
};
