import produce from '../util/produce';

const initialState = {
	user: 1,
	isLoggingIn: false,
	isLoggingOut: false,
	isSigningup: false,
	isSignedup: false,
	isLoggedIn: false,
	isLoggedOut: false,
	loginErrorReason: '',
	logoutErrorReason: '',
	signupErrorReason: '',
}

export const RESET_DONE_FLAG = 'RESET_DONE_FLAG';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const dummyUser = {
	email: 'anhs0220@gmail.com',
	name: '안홍섭',
	profileImg: 'https://media.vlpt.us/images/yujo/profile/053c9bee-1076-418c-808d-f9a1b88dc445/KakaoTalk_20200229_162658088.jpg?w=240',
}

const reducer = ( state=initialState, action ) => produce(state, (draft) => {
	switch (action.type) {
		case RESET_DONE_FLAG: {
			draft.isLoggedIn = false;
			draft.isLoggedOut = false;
			draft.isSignedup = false;
			break;
		}
		case LOGIN_REQUEST: {
			draft.isLoggingIn = true;
			break;
		}
		case LOGIN_SUCCESS: {
			draft.user = action.data;
			draft.isLoggingIn = false;
			draft.isLoggedIn = true;
			draft.isLoggedOut = false;
			break;
		}
		case LOGIN_FAILURE: {
			draft.isLoggingIn = false;
			draft.loginErrorReason = 'dummy is undefined';
			break;
		}

		case LOGOUT_REQUEST: {
			draft.isLoggingOut = true;
			break;
		}
		case LOGOUT_SUCCESS: {
			draft.user = null;
			draft.isLoggingOut = false;
			draft.isLoggedOut = true;
			draft.isLoggedIn = false;
			break;
		}
		case LOGOUT_FAILURE: {
			draft.isLoggingOut = false;
			draft.logoutErrorReason = 'logout error';
			break;
		}

		case SIGNUP_REQUEST: {
			draft.isSigningup = true;
			break;
		}
		case SIGNUP_SUCCESS: {
			draft.isSignedup = true;
			draft.isSigningup = false;
			break ;
		}
		case SIGNUP_FAILURE: {
			draft.isSigningup = false;
			draft.signupErrorReason = action.error;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
