import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';
import rootSaga from '../sagas';

import axios from 'axios';
import { GET_DUMMY_USER } from '../reducers/user';

const configureStore = (context) => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enhancer = process.env.NODE_ENV === 'production'
		? compose(applyMiddleware(...middlewares))
		: composeWithDevTools(
			applyMiddleware(...middlewares),
		);

	const preloadedState = process.env.__PRELOADED_STATE__;

	const store = createStore(reducer, preloadedState, enhancer);
	store.sagaTask = sagaMiddleware.run(rootSaga);
	if (process.env.NODE_ENV !== 'production') {
		store.dispatch({
			type: GET_DUMMY_USER
		})
	}
	return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
