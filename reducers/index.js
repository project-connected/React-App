import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import component from './component';
import user from './user';
import chat from './chat';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combineReducer = combineReducers({
				component,
				user,
				chat,
			});
			return combineReducer(state, action);
		}
	}
};

export default rootReducer
