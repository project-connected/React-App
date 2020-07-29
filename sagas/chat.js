import axios from 'axios';
import { call, all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import { OPEN_CHAT_ROOM_REQUEST, OPEN_CHAT_ROOM_SUCCESS, OPEN_CHAT_ROOM_FAILURE } from '../reducers/chat';

function openChatRoomAPI(chatRoomId) {
	return ;
}

function* openChatRoom(action) {
	try {
		// const result = yield call(openChatRoomAPI, action.data);
		yield put({
			type: OPEN_CHAT_ROOM_SUCCESS,
			// data: result.data,
		})
	} catch(e) {
		yield put({
			type: OPEN_CHAT_ROOM_FAILURE,
			error: e.response.error
		})
	}
}

function* watchOpenChatRoom() {
	yield takeLatest(OPEN_CHAT_ROOM_REQUEST, openChatRoom);
}

export default function* chatSaga(){
	yield all([
		fork(watchOpenChatRoom),
	]);
}
