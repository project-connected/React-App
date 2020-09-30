import produce from '../util/produce';

const dummyProject = {
	id: 0,
	thumbnail_img: 'https://i.pinimg.com/originals/68/94/93/6894931eb3e93f6d6ef2dd000d8acdc6.jpg',
	title: "우리 같이 프로젝트 모집 서비스를 만들어요!",
	theme: [{
		key: 'HACKERTON',
		value: '헤커톤'
	}],
	result: [{
		key: 'APPLICATION',
		value: '어플리케이션 개발'
	}, {
		key: 'WEB',
		value: '웹 개발',
	}],
	region: [{
		key: 'SEOUL',
		value: '서울'
	}],
	period: {
		endDate: '2020-10-14',
		startDate: '2020-09-01',
		diff: 14,
	},
	stacks: [{
		key: 'NODE',
		value: 'Node.JS',
		color: 'rgb(65, 169, 76)',
		num: 1,
		maxNum: 2,
	}, {
		key: 'REACT',
		value: 'React.JS',
		color: '#03254c',
		num: 0,
		maxNum: 1,
	}, {
		key: 'PHOTOSHOP',
		value: 'photoshop',
		color: '#187bcd',
		num: 1,
		maxNum: 1,
	}],
	description: '## 모두 안녕하세요 굿팀 프로젝트 모집 게시물입니다.',
	leaderUser: {
		userId: 1,
		userName: 'han',
	}
}

const initialState = {
	filterAttrOpenIndx: -1,
	projectList: [dummyProject],
	projectData: dummyProject,
	isCreating: false,
	isCreated: false,
	createError: '',
	isEditing: false,
	isEdited: false,
	editError: '',
	isRemoving: false,
	isRemoved: false,
	removeError: '',
}

export const OPEN_FILTER_ATTR = 'OPEN_FILTER_ATTR';

export const CLOSE_ALL_COMP2 = 'CLOSE_ALL_COMP2';

const reducer = (state=initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case CLOSE_ALL_COMP2: {
			draft.filterAttrOpenIndx = -1;
			break;
		}

		case OPEN_FILTER_ATTR: {
			draft.filterAttrOpenIndx = action.data;
			break;
		}

		default: {
			break;
		}
	}
})

export default reducer;
