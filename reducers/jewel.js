import produce from '../util/produce';

const dummyJewels = [{
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
},{
	id: 2,
	userId: 1,
	user: {
		userId: 1,
		userName: 'yshim',
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
		color: 'rgb(65, 169, 75)'
	},{
		key: 'NODE',
		value: 'Node.JS',
		color: 'rgb(65, 169, 75)'
	}],
	title: '전 대단한 사람입니다.',
	desc: '# test ## test ### test'
},{
	id: 3,
	userId: 1,
	user: {
		userId: 1,
		userName: 'hhan',
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
		color: 'rgb(65, 169, 75)'
	},{
		key: 'NODE',
		value: 'Node.JS',
		color: 'rgb(65, 169, 75)'
	}],
	title: '전 대단한 사람입니다.',
	desc: '# test ## test ### test'
},{
	id: 4,
	userId: 1,
	user: {
		userId: 1,
		userName: 'nukim',
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
		color: 'rgb(65, 169, 75)'
	},{
		key: 'NODE',
		value: 'Node.JS',
		color: 'rgb(65, 169, 75)'
	}],
	title: '전 대단한 사람입니다.',
	desc: '# test ## test ### test'
},]

const initialState = {
	isSubmitted: false,
	isSubmitting: false,
	isUpdated: false,
	isUpdating: false,
	isDeleted: false,
	isDeleting: false,
	isLoaded: false,
	isLoading: false,
	isLoadedJewel: false,
	isLoadingJewel: false,
	loadJewelError: '',
	submitError: '',
	updateError: '',
	deleteError: '',
	loadError: '',
	// jewels: [],
	jewels: dummyJewels,
	jewelData: dummyJewels[0],
};

export const CREATE_JEWEL_REQUEST = 'CREATE_JEWEL_REQUEST';
export const CREATE_JEWEL_SUCCESS = 'CREATE_JEWEL_SUCCESS';
export const CREATE_JEWEL_FAILURE = 'CREATE_JEWEL_FAILURE';

export const UPDATE_JEWEL_REQUEST = 'UPDATE_JEWEL_REQUEST';
export const UPDATE_JEWEL_SUCCESS = 'UPDATE_JEWEL_SUCCESS';
export const UPDATE_JEWEL_FAILURE = 'UPDATE_JEWEL_FAILURE';

export const DELETE_JEWEL_REQUEST = 'DELETE_JEWEL_REQUEST';
export const DELETE_JEWEL_SUCCESS = 'DELETE_JEWEL_SUCCESS';
export const DELETE_JEWEL_FAILURE = 'DELETE_JEWEL_FAILURE';

export const LOAD_JEWEL_LIST_REQUEST = 'LOAD_JEWEL_LIST_REQUEST';
export const LOAD_JEWEL_LIST_SUCCESS = 'LOAD_JEWEL_LIST_SUCCESS';
export const LOAD_JEWEL_LIST_FAILURE = 'LOAD_JEWEL_LIST_FAILURE';

export const LOAD_JEWEL_REQUEST = 'LOAD_JEWEL_REQUEST';
export const LOAD_JEWEL_SUCCESS = 'LOAD_JEWEL_SUCCESS';
export const LOAD_JEWEL_FAILURE = 'LOAD_JEWEL_FAILURE';



const reducer = (state=initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case CREATE_JEWEL_REQUEST: {
			draft.isSubmitting = true;
			break;
		}
		case CREATE_JEWEL_SUCCESS: {
			draft.isSubmitting = false;
			draft.isSubmitted = true;
			break;
		}
		case CREATE_JEWEL_REQUEST: {
			draft.isSubmitting = false;
			draft.submitError = action.error;
			break;
		}

		case UPDATE_JEWEL_REQUEST: {
			draft.isUpdating = true;
			break;
		}
		case UPDATE_JEWEL_SUCCESS: {
			draft.isUpdating = false;
			draft.isUpdated = true;
			break;
		}
		case UPDATE_JEWEL_FAILURE: {
			draft.isUpdating = false;
			draft.updateError = action.error;
			break;
		}

		case DELETE_JEWEL_REQUEST: {
			draft.isDeleting = true;
			break;
		}
		case DELETE_JEWEL_SUCCESS: {
			draft.isDeleting = false;
			draft.isDeleted = true;
			break;
		}
		case DELETE_JEWEL_FAILURE: {
			draft.isDeleting = false;
			draft.deleteError = action.error;
			break;
		}

		case LOAD_JEWEL_LIST_REQUEST: {
			draft.isLoading = true;
			break;
		}
		case LOAD_JEWEL_LIST_SUCCESS: {
			draft.isLoading = false;
			draft.isLoaded = true;
			draft.jewels = action.data;
			break;
		}
		case LOAD_JEWEL_LIST_FAILURE: {
			draft.isLoading = false;
			draft.loadError = action.error;
			break;
		}

		case LOAD_JEWEL_REQUEST: {
			draft.isLoadingJewel = true;
			break;
		}
		case LOAD_JEWEL_SUCCESS: {
			draft.isLoadingJewel = false;
			draft.isLoadedJewel = true;
			draft.jewelData = action.data;
			break;
		}
		case LOAD_JEWEL_FAILURE: {
			draft.isLoadingJewel = false;
			draft.loadJewelError = action.error;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
