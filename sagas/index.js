import axios from 'axios';
import { all, call } from 'redux-saga/effects';

import user from './user';
import chat from './chat';

axios.defaults.baseURL = 'http://13.124.54.4:51818/api';
// axios.defaults.withCredentials = true;

export default function* rootSaga(){
	yield all([
		call(user),
		call(chat),
	])
}
