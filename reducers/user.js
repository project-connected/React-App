import produce from '../util/produce';

const dummyUser = {
	useId: 1,
	email: 'anhs0220@gmail.com',
	userName: 'Forty Two Seoul',
	profileImg: 'https://external-gmp1-1.xx.fbcdn.net/safe_image.php?d=AQAUhiuGEu_G5BMX&w=952&h=952&url=https%3A%2F%2Fscontent-gmp1-1.cdninstagram.com%2Fv%2Ft51.29350-15%2F117758003_121361729422768_5810775009689931108_n.jpg%3F_nc_cat%3D1%26_nc_sid%3D8ae9d6%26_nc_eui2%3DAeFVPPTRUmnnrLJmZD2wUJrEMMSk6ysYZm8wxKTrKxhmb_PCrerJ71X-qFfDOUoSjAm1RzegPawmbm40UGsLXw5F%26_nc_ohc%3Dz5Iu8p0rXMMAX_ABMhQ%26_nc_ht%3Dscontent-gmp1-1.cdninstagram.com%26oh%3D3c74d8cbb8083996ec37b64543c87e4e%26oe%3D5F663D7B&cfs=1&_nc_eui2=AeEuiFkzt-ev2dTQsYV88SrjkkdsKksNmduSR2wqSw2Z20aWDr0qywO2dsTLfWozcGC4Lo0FXGLV62sAx53N2aHb&_nc_hash=AQCPJUh53izxKRMM',
	subProfile: {
		region: "서울",
		stacks: [{
			key: "REACT",
			value: "React.js",
			color: '#A0A0FF',
		},{
			key: "NODE",
			value: "Node.js",
			color: '#A0FFA0',
		}],
		theme: [{
			key: 'STARTUP',
			value: '스타트업'
		}, {
			key: 'HACKERTON',
			value: '해커톤'
		}],
		result: [{
			key: 'APPLICATION',
			value: '어플리케이션 개발'
		}, {
			key: 'WEB',
			value: '웹 개발'
		},{
			key: 'APPLICATION',
			value: '어플리케이션 개발'
		}, {
			key: 'WEB',
			value: '웹 개발'
		},{
			key: 'APPLICATION',
			value: '어플리케이션 개발'
		}, {
			key: 'WEB',
			value: '웹 개발'
		},],
		url: "https://github.com/gitseob",
		introduct: "### 안녕하세용 저는 정말 프로젝트를 완성하고 싶은 사람입니다. **하지만 전 게을러요**",
	}
}

const initialState = {
	user: dummyUser,
	isLoggingIn: false,
	isLoggingOut: false,
	isSigningup: false,
	isSignedup: false,
	isLoggedIn: false,
	isLoggedOut: false,
	loginErrorReason: '',
	logoutErrorReason: '',
	signupErrorReason: '',
	other: dummyUser,
}

export const RESET_DONE_FLAG = 'RESET_DONE_FLAG';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const reducer = ( state=initialState, action ) => produce(state, (draft) => {
	switch (action.type) {
		case RESET_DONE_FLAG: {
			draft.isLoggedIn = false;
			draft.isLoggedOut = false;
			draft.isSignedup = false;
			break;
		}

		case LOAD_USER_REQUEST: {
			break;
		}
		case LOAD_USER_SUCCESS: {
			draft.user = action.data;
			draft.isLoggedIn = true;
			break;
		}
		case LOAD_USER_FAILURE: {
			break;
		}

		case LOGIN_REQUEST: {
			draft.isLoggingIn = true;
			break;
		}
		case LOGIN_SUCCESS: {
			draft.user = action.data.result.user;
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
