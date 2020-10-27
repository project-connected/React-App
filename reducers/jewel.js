import produce from '../util/produce';

const initialState = {
	isSubmitted: false,
	isSubmitting: false,
	isUpdated: false,
	isUpdating: false,
	isDeleted: false,
	isDeleting: false,
	isLoadedList: false,
	isLoadingList: false,
	isLoadedJewel: false,
	isLoadingJewel: false,
	loadJewelError: '',
	submitError: '',
	updateError: '',
	deleteError: '',
	loadError: '',
	jewels: null,
	jewelData: null,
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

export const FILTER_JEWEL_LIST_REQUEST = 'FILTER_JEWEL_LIST_REQUEST';
export const FILTER_JEWEL_LIST_SUCCESS = 'FILTER_JEWEL_LIST_SUCCESS';
export const FILTER_JEWEL_LIST_FAILURE = 'FILTER_JEWEL_LIST_FAILURE';

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
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

			case FILTER_JEWEL_LIST_REQUEST:
			case LOAD_JEWEL_LIST_REQUEST: {
				draft.isLoadingList = true;
				break;
			}

			case FILTER_JEWEL_LIST_SUCCESS:
			case LOAD_JEWEL_LIST_SUCCESS: {
				draft.isLoadingList = false;
				draft.isLoadedList = true;
				draft.jewels = action.data;
				break;
			}

			case FILTER_JEWEL_LIST_FAILURE:
			case LOAD_JEWEL_LIST_FAILURE: {
				draft.isLoadingList = false;
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
				draft.jewelData = action.data.result;
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
	});

export default reducer;
