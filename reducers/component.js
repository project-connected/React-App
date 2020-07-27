import produce from '../util/produce';

const initialState = {
	openChat: false,
	openUserMenu: false,
}

export const OPEN_CHAT = "OPEN_CHAT";
export const CLOSE_CHAT = "CLOSE_CHAT";

export const OPEN_USER_MENU = "OPEN_USER_MENU";
export const CLOSE_USER_MENU = "CLOSE_USER_MENU";

const reducer = ( state=initialState, action ) => produce(state, (draft) => {
	switch (action.type) {
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

		default: {
			break;
		}
	}
})

export default reducer;
