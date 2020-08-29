import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import component from './component';
import user from './user';
import chat from './chat';
import project from './project';
import jewel from './jewel';
import common from './common';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combineReducer = combineReducers({
				component,
				user,
				chat,
				project,
				jewel,
				common,
			});
			return combineReducer(state, action);
		}
	}
};

export default rootReducer
