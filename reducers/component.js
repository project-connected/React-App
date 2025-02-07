import produce from '../util/produce';

const initialState = {
	openChat: false,
	openUserMenu: false,
	openApply: false,
	openUserProfile: false,
	openEnterSubProfile: false
}

export const CLOSE_ALL_COMP1 = 'CLOSE_ALL_COMP1';

export const OPEN_CHAT = "OPEN_CHAT";
export const CLOSE_CHAT = "CLOSE_CHAT";

export const OPEN_USER_MENU = "OPEN_USER_MENU";
export const CLOSE_USER_MENU = "CLOSE_USER_MENU";

export const OPEN_APPLY = "OPEN_APPLY";
export const CLOSE_APPLY = "CLOSE_APPLY";

export const OPEN_SUB_PROFILE = 'OPEN_SUB_PROFILE';
export const CLOSE_SUB_PROFILE = 'CLOSE_SUB_PROFILE';

const reducer = ( state=initialState, action ) => produce(state, (draft) => {
	switch (action.type) {
		case CLOSE_ALL_COMP1: {
			draft.openChat = false;
			break;
		}
		case OPEN_CHAT: {
			draft.openChat = true;
			break;
		}
		case CLOSE_CHAT: {
			draft.openChat = false;
			break;
		}

		case OPEN_USER_MENU: {
			draft.openUserMenu = true;
			break;
		}
		case CLOSE_USER_MENU: {
			draft.openUserMenu = false;
			break;
		}

		case OPEN_SUB_PROFILE: {
			draft.openEnterSubProfile = true;
			break;
		}
		case CLOSE_SUB_PROFILE: {
			draft.openEnterSubProfile = false;
			break
		}

		case OPEN_APPLY: {
			draft.openApply = true;
			draft.openChat = false;
			draft.openUserMenu = false;
			break;
		}
		case CLOSE_APPLY: {
			draft.openApply = false;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
