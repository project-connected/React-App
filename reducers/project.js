import produce from '../util/produce';

const initialState = {
	search_region: '',
	search_theme: '',
	search_priod: '',
	search_stacks: [],
}

export const GET_REGION_FOR_SEARCH = 'GET_REGION_FOR_SEARCH';
export const GET_THEME_FOR_SEARCH = 'GET_THEME_FOR_SEARCH';
export const GET_PRIOD_FOR_SEARCH = 'GET_PRIOD_FOR_SEARCH';
export const GET_STACK_FOR_SEARCH = 'GET_STACK_FOR_SEARCH';

const reducer = (state=initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case GET_REGION_FOR_SEARCH: {
			draft.search_region = action.data;
			break;
		}
		case GET_THEME_FOR_SEARCH: {
			draft.search_theme = action.data;
			break;
		}
		case GET_PRIOD_FOR_SEARCH: {
			draft.search_priod = action.data;
			break;
		}

		case GET_STACK_FOR_SEARCH: {
			draft.search_stacks = action.data;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
