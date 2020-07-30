import axios from 'axios';
import { all, call } from 'redux-saga/effects';

import user from './user';
import chat from './chat';

export default function* rootSaga(){
	yield all([
		call(user),
		call(chat),
	])
}
