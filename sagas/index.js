import axios from 'axios';
import { all, call } from 'redux-saga/effects';

import user from './user';
import chat from './chat';

axios.defaults.baseURL = 'http://3.34.129.189/api';
// axios.defaults.withCredentials = true;

export default function* rootSaga(){
	yield all([
		call(user),
		call(chat),
	])
}
