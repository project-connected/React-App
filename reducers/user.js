import produce from "../util/produce";

const dummyJewel = {
	id: 1,
	userId: 1,
	user: {
		userId: 1,
		userName: "han",
		// profileImg: 'https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg',
	},
	theme: [
		{
			key: "HACKERTON",
			value: "해커톤",
		},
	],
	area: [
		{
			key: "SEOUL",
			value: "서울",
		},
	],
	purpose: [
		{
			key: "APPLICATION",
			value: "어플리케이션 개발",
		},
	],
	period: {
		startDate: "Mon Sep 07 2020 06:26:32 GMT+0900 (대한민국 표준시)",
		endDate: "Mon Sep 14 2020 06:26:32 GMT+0900 (대한민국 표준시)",
	},
	skill: [
		{
			key: "REACT",
			value: "React.JS",
			color: "rgb(255, 169, 75)",
		},
		{
			key: "NODE",
			value: "Node.JS",
			color: "rgb(65, 169, 255)",
		},
	],
	title: "전 대단한 사람입니다.",
	desc: "# test ## test ### test",
};

const dummyProject = [
	{
		id: 0,
		thumbnail_img:
			"https://i.pinimg.com/originals/68/94/93/6894931eb3e93f6d6ef2dd000d8acdc6.jpg",
		title: "우리 같이 프로젝트 모집 서비스를 만들어요!",
		part: {
			stack: [
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
			],
		},
		score: 3.5,
		evaluations: [
			{
				score: 4.5,
				content: "너무 잘해주셔서 감사합니다.",
			},
			{
				score: 5,
				content: "캐리해주셔서 고마워요 ㅠㅠ",
			},
			{
				score: 1,
				content: "잘생겨서 질투남 그래서 1점드림",
			},
		],
		theme: [
			{
				key: "HACKERTON",
				value: "헤커톤",
			},
		],
		result: [
			{
				key: "APPLICATION",
				value: "어플리케이션 개발",
			},
			{
				key: "WEB",
				value: "웹 개발",
			},
		],
		region: {
			key: "SEOUL",
			value: "서울",
		},
		endDate: "2020-10-14",
		startDate: "2020-09-01",
		stacks: [
			{
				key: "NODE",
				value: "Node.JS",
				color: "rgb(65, 169, 76)",
				num: 1,
				maxNum: 2,
			},
			{
				key: "REACT",
				value: "React.JS",
				color: "#03254c",
				num: 0,
				maxNum: 1,
			},
			{
				key: "PHOTOSHAP",
				value: "photoshop",
				color: "#187bcd",
				num: 1,
				maxNum: 1,
			},
		],
		description: "## 모두 안녕하세요 굿팀 프로젝트 모집 게시물입니다.",
	},
	{
		id: 0,
		thumbnail_img:
			"https://i.pinimg.com/originals/68/94/93/6894931eb3e93f6d6ef2dd000d8acdc6.jpg",
		title: "우리 같이 프로젝트 모집 서비스를 만들어요!",
		part: {
			stack: [
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
				{
					key: "REACT",
					value: "React.js",
					color: "rgb(65, 169, 76)",
				},
			],
		},
		score: 3,
		evaluations: [
			{
				score: 4,
				content: "너무 잘해주셔서 감사합니다.",
			},
			{
				score: 4,
				content: "캐리해주셔서 고마워요 ㅠㅠ",
			},
			{
				score: 1,
				content: "잘생겨서 질투남 그래서 1점드림",
			},
		],
		theme: [
			{
				key: "HACKERTON",
				value: "헤커톤",
			},
		],
		result: [
			{
				key: "APPLICATION",
				value: "어플리케이션 개발",
			},
			{
				key: "WEB",
				value: "웹 개발",
			},
		],
		region: {
			key: "SEOUL",
			value: "서울",
		},
		endDate: "2020-10-14",
		startDate: "2020-09-01",
		stacks: [
			{
				key: "NODE",
				value: "Node.JS",
				color: "rgb(65, 169, 76)",
				num: 1,
				maxNum: 2,
			},
			{
				key: "REACT",
				value: "React.JS",
				color: "#03254c",
				num: 0,
				maxNum: 1,
			},
			{
				key: "PHOTOSHAP",
				value: "photoshop",
				color: "#187bcd",
				num: 1,
				maxNum: 1,
			},
		],
		description: "## 모두 안녕하세요 굿팀 프로젝트 모집 게시물입니다.",
	},
];

const dummyUser = {
	userId: 1,
	email: "anhs0220@gmail.com",
	userName: "Forty Two Seoul",
	jewelData: dummyJewel,
	projectData: dummyProject,
};

const initialState = {
	user: dummyUser,
	isLoggingIn: false,
	isLoggingOut: false,
	isSigningup: false,
	isSignedup: false,
	isLoggedIn: false,
	isLoggedOut: false,
	isSavingProfile: false,
	isSavedProfile: false,
	loginErrorReason: "",
	logoutErrorReason: "",
	signupErrorReason: "",
	saveProfileError: "",
	other: dummyUser,
};

export const GET_DUMMY_USER = "GET_DUMMY_USER";

export const RESET_DONE_FLAG = "RESET_DONE_FLAG";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const SAVE_SUBPROFILE_REQUEST = "SAVE_SUBPROFILE_REQUEST";
export const SAVE_SUBPROFILE_SUCCESS = "SAVE_SUBPROFILE_SUCCESS";
export const SAVE_SUBPROFILE_FAILURE = "SAVE_SUBPROFILE_FAILURE";

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_DUMMY_USER: {
				draft.user = dummyUser;
				break;
			}

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
				draft.user.subProfile = dummyUser.subProfile;
				draft.user.profileImg = dummyUser.profileImg;
				draft.user.url = dummyUser.url;
				draft.user.introduct = dummyUser.introduct;
				draft.user.jewelData = dummyJewel;
				draft.user.projectData = dummyProject;
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
				draft.user.subProfile = dummyUser.subProfile;
				draft.user.profileImg = dummyUser.profileImg;
				draft.user.url = dummyUser.url;
				draft.user.introduct = dummyUser.introduct;
				draft.user.jewelData = dummyJewel;
				draft.user.projectData = dummyProject;
				draft.isLoggingIn = false;
				draft.isLoggedIn = true;
				draft.isLoggedOut = false;
				break;
			}
			case LOGIN_FAILURE: {
				draft.isLoggingIn = false;
				draft.loginErrorReason = action.error;
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
				draft.logoutErrorReason = "logout error";
				break;
			}

			case SIGNUP_REQUEST: {
				draft.isSigningup = true;
				break;
			}
			case SIGNUP_SUCCESS: {
				draft.isSignedup = true;
				draft.isSigningup = false;
				break;
			}
			case SIGNUP_FAILURE: {
				draft.isSigningup = false;
				draft.signupErrorReason = action.error;
				break;
			}

			case SAVE_SUBPROFILE_REQUEST: {
				draft.isSavingProfile = true;
				break;
			}
			case SAVE_SUBPROFILE_SUCCESS: {
				draft.isSavingProfile = false;
				draft.isSavedProfile = true;
				draft.user = action.data;
				draft.user.jewelData = dummyJewel;
				draft.user.projectData = dummyProject;
				break;
			}
			case SAVE_SUBPROFILE_FAILURE: {
				draft.isSavingProfile = false;
				draft.saveProfileError = action.error;
				break;
			}

			default: {
				break;
			}
		}
	});

export default reducer;
