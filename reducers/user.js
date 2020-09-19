import produce from '../util/produce';

const dummyJewel = {
	id: 1,
	userId: 1,
	user: {
		userId: 1,
		userName: 'han',
		profileImg: 'https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg',
	},
	theme: {
		key: 'HACKERTON',
		value: '해커톤'
	},
	region: {
		key: 'SEOUL',
		value: '서울'
	},
	result: {
		key: 'APPLICATION',
		value: '어플리케이션 개발'
	},
	period: {
		startDate: 'Mon Sep 07 2020 06:26:32 GMT+0900 (대한민국 표준시)',
		endDate: 'Mon Sep 14 2020 06:26:32 GMT+0900 (대한민국 표준시)',
	},
	stacks: [{
		key: 'REACT',
		value: 'React.JS',
		color: 'rgb(255, 169, 75)'
	},{
		key: 'NODE',
		value: 'Node.JS',
		color: 'rgb(65, 169, 255)'
	}],
	title: '전 대단한 사람입니다.',
	desc: '# test ## test ### test'
}

const dummyProject = [{
	id: 0,
	thumbnail_img: 'https://i.pinimg.com/originals/68/94/93/6894931eb3e93f6d6ef2dd000d8acdc6.jpg',
	title: "우리 같이 프로젝트 모집 서비스를 만들어요!",
	theme: {
		id: 0,
		content: '헤커톤'
	},
	result: [{
			id: 0,
			content: '어플리케이션 개발'
		}, {
			id: 1,
			content: '웹 개발',
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	},{
		name: 'React.JS',
		color: '#03254c',
		num: 0,
		maxNum: 1,
	}, {
		name: 'photoshop',
		color: '#187bcd',
		num: 1,
		maxNum: 1,
	}],
	description: '## 모두 안녕하세요 굿팀 프로젝트 모집 게시물입니다.'
},{
	id: 1,
	title: "하고싶으면 신청하셈",
	thumbnail_img: 'https://lh3.googleusercontent.com/proxy/s6tZh4GsdYnP0bmyDLRU8jhcvKgKCJzw-FP5LlIRmdyoQIVxskervsIlHEs84iDCeWZcDTgBCzXyzaJcDLYgMDUE2JK-G5guvoS9AEmHLSZw1yA6DjjidVEvQd1U-QNB4lGn3vyq6AzQDkVUQLhRptkshcE',
	theme: {
		id: 1,
		content: '취미'
	},
	result: [{
			id: 2,
			content: '서버 개발',
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	},{
		name: 'Spring',
		color: 'rgb(65, 169, 76)',
		num: 0,
		maxNum: 4,
	}],
	description: '## 아 신청하던가 말던가'
},{
	id: 2,
	title: "공모전 나가실 분 !!",
	thumbnail_img: 'https://i.pinimg.com/564x/ef/c0/43/efc043c907b698025d3f4d10ccb0dc43.jpg',
	theme: {
		id: 2,
		content: '공모전'
	},
	result: [{
			id: 0,
			content: '어플리케이션 개발'
		}, {
			id: 2,
			content: '서버 개발',
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	},{
		name: 'React.JS',
		color: '#03254c',
		num: 0,
		maxNum: 1,
	}],
	description: '# 상금이 무려 5억5천5백만원인 공모전 같이 나가요 !'
},{
	id: 3,
	title: "42Rank를 같이 만드실 분 구합니다",
	thumbnail_img: 'https://lh3.googleusercontent.com/proxy/ELM-s_FpaSfpNxlSIr0WmGavAeZY9WpaLg4CEpakbV1d-hGIAaGMKuwpa8AIwjhQSPXkKXSWoqHM7Q3WKDkKbQVJ8kNS0zRY',
	theme: {
		id: 1,
		content: '취미'
	},
	result: [{
		id: 1,
		content: "웹 개발",
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Python',
		color: '#e7ec00',
		num: 1,
		maxNum: 999,
	}],
	description: '# 근본있는 언어 Django로 Rank42를 개발하실 분 구합니다.'
}]

const dummyUser = {
	userId: 1,
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
		}],
		url: "https://github.com/gitseob",
		introduct: "### 안녕하세용 저는 정말 프로젝트를 완성하고 싶은 사람입니다. **하지만 전 게을러요**",
	},
	jewelData: dummyJewel,
	projectData: null,
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
