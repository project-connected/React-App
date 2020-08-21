import produce from '../util/produce';

const dummyProject = [{
	id: 0,
	thumbnail_img: 'https://i.pinimg.com/originals/68/94/93/6894931eb3e93f6d6ef2dd000d8acdc6.jpg',
	title: "우리 같이 프로젝트 모집 서비스를 만들어요!",
	theme: {
		id: 0,
		content: '헤커톤'
	},
	result: [{
			id: 0,
			content: '어플리케이션 개발'
		}, {
			id: 1,
			content: '웹 개발',
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	},{
		name: 'React.JS',
		color: '#03254c',
		num: 0,
		maxNum: 1,
	}, {
		name: 'photoshop',
		color: '#187bcd',
		num: 1,
		maxNum: 1,
	}],
	description: '## 모두 안녕하세요 굿팀 프로젝트 모집 게시물입니다.'
},{
	id: 1,
	title: "하고싶으면 신청하셈",
	thumbnail_img: 'https://lh3.googleusercontent.com/proxy/s6tZh4GsdYnP0bmyDLRU8jhcvKgKCJzw-FP5LlIRmdyoQIVxskervsIlHEs84iDCeWZcDTgBCzXyzaJcDLYgMDUE2JK-G5guvoS9AEmHLSZw1yA6DjjidVEvQd1U-QNB4lGn3vyq6AzQDkVUQLhRptkshcE',
	theme: {
		id: 1,
		content: '취미'
	},
	result: [{
			id: 2,
			content: '서버 개발',
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	},{
		name: 'Spring',
		color: 'rgb(65, 169, 76)',
		num: 0,
		maxNum: 4,
	}],
	description: '## 아 신청하던가 말던가'
},{
	id: 2,
	title: "공모전 나가실 분 !!",
	thumbnail_img: 'https://i.pinimg.com/564x/ef/c0/43/efc043c907b698025d3f4d10ccb0dc43.jpg',
	theme: {
		id: 2,
		content: '공모전'
	},
	result: [{
			id: 0,
			content: '어플리케이션 개발'
		}, {
			id: 2,
			content: '서버 개발',
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	},{
		name: 'React.JS',
		color: '#03254c',
		num: 0,
		maxNum: 1,
	}],
	description: '# 상금이 무려 5억5천5백만원인 공모전 같이 나가요 !'
},{
	id: 3,
	title: "42Rank를 같이 만드실 분 구합니다",
	thumbnail_img: 'https://lh3.googleusercontent.com/proxy/ELM-s_FpaSfpNxlSIr0WmGavAeZY9WpaLg4CEpakbV1d-hGIAaGMKuwpa8AIwjhQSPXkKXSWoqHM7Q3WKDkKbQVJ8kNS0zRY',
	theme: {
		id: 1,
		content: '취미'
	},
	result: [{
		id: 1,
		content: "웹 개발",
	}],
	region: {
		id: 0,
		spot: '서울'
	},
	startDate: 'Fri Aug 21 2020 19:28:29 GMT+0900 (대한민국 표준시)',
	period: 14,
	stacks: [{
		name: 'Python',
		color: '#e7ec00',
		num: 1,
		maxNum: 999,
	}],
	description: '# 근본있는 언어 Django로 Rank42를 개발하실 분 구합니다.'
},]

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
	projectList: dummyProject,
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

export const DELETE_STACK_FOR_CREATE = 'DELETE_STACK_FOR_CREATE';

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
			draft.search_region = draft.search_region.filter(v => v !== action.data);
			break;
		}

		case GET_THEME_FOR_SEARCH: {
			draft.search_theme = draft.search_theme.concat(action.data);
			break;
		}
		case LOSE_THEME_FOR_SEARCH: {
			draft.search_theme = draft.search_theme.filter(v => v !== action.data);
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
			draft.create_region = action.data;
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

		case DELETE_STACK_FOR_CREATE: {
			draft.create_stacks = draft.create_stacks.filter(v => v.name !== action.data.name)
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
