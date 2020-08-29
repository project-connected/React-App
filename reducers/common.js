import produce from '../util/produce';

const initialState = {
	isLoading: false,
	isLoadded: false,
	loadError: '',
	region: [],
	skills: [],
	themes: [],
};

export const LOAD_COMMON_REQUEST = 'LOAD_COMMON_REQUEST';
export const LOAD_COMMON_SUCCESS = 'LOAD_COMMON_SUCCESS';
export const LOAD_COMMON_FAILURE = 'LOAD_COMMON_FAILURE';

const reducer = ( state=initialState, action ) => produce(state, (draft) => {
	switch (action.type) {
		case LOAD_COMMON_REQUEST: {
			draft.isLoading = true;
			break;
		}
		case LOAD_COMMON_SUCCESS: {
			draft.isLoading = false;
			draft.isLoadded = true;
			draft.region = action.data.areas;
			draft.skills = action.data.skills;
			draft.themes = action.data.themes;
			break;
		}
		case LOAD_COMMON_FAILURE: {
			draft.isLoading = false;
			// draft.loadError = action.error;
		}
		default: {
			break;
		}
	}
});

export default reducer;
