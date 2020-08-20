import produce from '../util/produce';

const initialState = {
	search_region: [],
	search_theme: [],
	search_priod: '',
	search_stacks: [],
	filterAttrOpenIndx: -1,
	create_stacks: [],
	create_theme: '',
	create_result: '',
	create_region: '',
	create_priod: '',
}

export const GET_REGION_FOR_SEARCH = 'GET_REGION_FOR_SEARCH';
export const GET_THEME_FOR_SEARCH = 'GET_THEME_FOR_SEARCH';
export const GET_PRIOD_FOR_SEARCH = 'GET_PRIOD_FOR_SEARCH';
export const GET_STACK_FOR_SEARCH = 'GET_STACK_FOR_SEARCH';

export const LOSE_REGION_FOR_SEARCH = 'LOSE_REGION_FOR_SEARCH';
export const LOSE_THEME_FOR_SEARCH = 'LOSE_THEME_FOR_SEARCH';
export const LOSE_PRIOD_FOR_SEARCH = 'LOSE_PRIOD_FOR_SEARCH';
export const LOSE_STACK_FOR_SEARCH = 'LOSE_STACK_FOR_SEARCH';


export const GET_REGION_FOR_CREATE = 'GET_REGION_FOR_CREATE';
export const GET_THEME_FOR_CREATE = 'GET_THEME_FOR_CREATE';
export const GET_RESULT_FOR_CREATE = 'GET_RESULT_FOR_CREATE';
export const GET_PRIOD_FOR_CREATE = 'GET_PRIOD_FOR_CREATE';
export const GET_STACK_FOR_CREATE = 'GET_STACK_FOR_CREATE';

export const OPEN_FILTER_ATTR = 'OPEN_FILTER_ATTR';

export const CLOSE_ALL_COMP2 = 'CLOSE_ALL_COMP2';

const reducer = (state=initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case CLOSE_ALL_COMP2: {
			draft.filterAttrOpenIndx = -1;
			break;
		}
		case GET_REGION_FOR_SEARCH: {
			draft.search_region = draft.search_region.concat(action.data);
			break;
		}
		case LOSE_REGION_FOR_SEARCH: {
			draft.search_region = draft.search_region.filter(v => v.name !== action.data.name);
			break;
		}

		case GET_THEME_FOR_SEARCH: {
			draft.search_theme = draft.search_theme.concat(action.data);
			break;
		}
		case LOSE_THEME_FOR_SEARCH: {
			draft.search_region = draft.search_theme.filter(v => v.name !== action.data.name);
			break;
		}

		case GET_PRIOD_FOR_SEARCH: {
			draft.search_priod = action.data;
			break;
		}

		case GET_STACK_FOR_SEARCH: {
			draft.search_stacks = draft.search_stacks.concat(action.data);
			break;
		}
		case LOSE_STACK_FOR_SEARCH: {
			draft.search_stacks = draft.search_stacks.filter(v => v.name !== action.data.name);
			break;
		}

		case OPEN_FILTER_ATTR: {
			draft.filterAttrOpenIndx = action.data;
			break;
		}

		case GET_REGION_FOR_CREATE: {
			draft.search_region = action.data;
			break;
		}
		case GET_STACK_FOR_CREATE: {
			draft.create_stacks = draft.create_stacks.concat(action.data);
			break;
		}
		case GET_THEME_FOR_CREATE: {
			draft.create_theme = action.data;
			break;
		}
		case GET_RESULT_FOR_CREATE: {
			draft.create_result = action.data;
			break;
		}
		case GET_PRIOD_FOR_CREATE: {
			draft.create_priod = action.data;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
