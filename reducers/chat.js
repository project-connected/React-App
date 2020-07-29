import produce from '../util/produce';

const initialState = {
	isLoadingData: false,
	isLoadedData: false,
	loadingChatErrorReason: '',
}

export const EXIT_CHAT_ROOM = 'EXIT_CHAT_ROOM';

export const OPEN_CHAT_ROOM_REQUEST = "OPEN_CHAT_ROOM_REQUEST";
export const OPEN_CHAT_ROOM_SUCCESS = "OPEN_CHAT_ROOM_SUCCESS";
export const OPEN_CHAT_ROOM_FAILURE = "OPEN_CHAT_ROOM_FAILURE";

const reducer = ( state=initialState, action ) => produce(state, (draft) => {
	switch (action.type) {
		case EXIT_CHAT_ROOM: {
			draft.isLoadedData = false;
			break;
		}

		case OPEN_CHAT_ROOM_REQUEST: {
			draft.isLoadingData = true;
			break;
		}
		case OPEN_CHAT_ROOM_SUCCESS: {
			draft.isLoadingData = false;
			draft.isLoadedData = true;
			break;
		}
		case OPEN_CHAT_ROOM_FAILURE: {
			draft.isLoadingData = false;
			draft.loadingChatErrorReason = action.error;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
