import axios from "axios";
import { all, call } from "redux-saga/effects";

import user from "./user";
import chat from "./chat";
import common from "./common";
import jewel from "./jewel";

axios.defaults.baseURL = "https://gtserver.anjoy.info/api";
axios.defaults.withCredentials = true;
axios.defaults.headers.authorization = "";
axios.defaults.timeout = 10000;

export default function* rootSaga() {
	yield all([call(user), call(chat), call(common), call(jewel)]);
}
