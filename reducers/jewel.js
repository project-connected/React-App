import produce from '../util/produce';

const initialState = {
	isSubmitted: false,
	isSubmitting: false,
	isUpdated: false,
	isUpdating: false,
	isDeleted: false,
	isDeleting: false,
	isLoaded: false,
	isLoading: false,
	submitError: '',
	updateError: '',
	deleteError: '',
	loadError: '',
	submitInfo: {
		title: '',
		region: '',
		theme: '',
		result: '',
		period: {
			startDate: '',
			endDate: '',
		},
		stacks: [],
		content: '',
	},
	searchFilter: {
		region: [],
		theme: [],
		result: [],
		period: {
			startDate: '',
			endDate: ''
		},
		stacks: [],
	},
	jewelBox: [],
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

		case LOAD_JEWEL_REQUEST: {
			draft.isLoading = true;
			break;
		}
		case LOAD_JEWEL_SUCCESS: {
			draft.isLoading = false;
			draft.isLoaded = true;
			draft.jewelBox = action.data;
			break;
		}
		case LOAD_JEWEL_FAILURE: {
			draft.isLoading = false;
			draft.loadError = action.error;
			break;
		}
		default: {
			break;
		}
	}
})

export default reducer;
