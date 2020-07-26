import produce from '../util/produce';

const initialState = {
	openChat: false,
}

export const OPEN_CHAT = "OPEN_CHAT";
export const CLOSE_CHAT = "CLOSE_CHAT";

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

		default: {
			break;
		}
	}
})

export default reducer;
