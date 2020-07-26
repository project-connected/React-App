import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import component from './component';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combineReducer = combineReducers({
				component,
			});
			return combineReducer(state, action);
		}
	}
};

export default rootReducer
