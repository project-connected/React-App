import React, {useState, useCallback, useEffect} from 'react';

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../../store/configureStore';

import JewelDetail from '../../components/JewelDetail';
import JewelCard from '../../components/JewelCard';
import SelectAttr from '../../components/buttons/SelectAttr';
import SelectPeriod from '../../components/buttons/SelectPeriod';
import SelectStack from '../../components/buttons/SelectStack';

import { LOAD_COMMON_REQUEST } from '../../reducers/common';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_JEWEL_LIST_REQUEST, LOAD_JEWEL_REQUEST } from '../../reducers/jewel';

const dummyResult = [{
	key: 'APPLICATION',
	value: '어플리케이션 개발'
}, {
	key: 'WEB',
	value: '웹 개발'
}, {
	key: 'SERVER',
	value: '서버 개발'
}];

const FindJewel = props => {
	const { region, themes, skills } = useSelector(state=>state.common);
	const { jewelData } = useSelector(state=>state.jewel);
	const { jewels } = useSelector(state=>state.jewel);
	const dispatch = useDispatch();

	const [searchRegion, setSearchRegion] = useState([]);
	const [searchTheme, setSearchTheme] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [searchStack, setSearchStack] = useState([]);
	const [period, setPeriod] = useState({startData: new Date(), endDate: new Date()});

	const [openDetail, setOpenDetail] = useState(false);

	const OCSearchRegion = useCallback((data) => {
		setSearchRegion([...searchRegion, data]);
	}, [searchRegion]);

	const OCSearchTheme = useCallback((data) => {
		setSearchTheme([...searchTheme, data]);
	}, [searchTheme]);

	const OCSearchResult = useCallback((data) => {
		setSearchResult([...searchResult, data]);
	}, [searchResult]);

	const OCSearchStack = useCallback((data) => {
		setSearchStack([...searchStack, data]);
	}, [searchStack]);

	const removeRegion = useCallback((data) => (e) => {
		e.preventDefault();
		setSearchRegion(searchRegion.filter(v => v.key !== data.key));
	}, [searchRegion]);
	const removeTheme = useCallback((data) => (e) => {
		e.preventDefault();
		setSearchTheme(searchTheme.filter(v => v.key !== data.key));
	}, [searchTheme]);
	const removeResult = useCallback((data) => (e) => {
		e.preventDefault();
		setSearchResult(searchResult.filter(v => v.key !== data.key));
	}, [searchRegion]);
	const removeStack = useCallback((data) => (e) => {
		e.preventDefault();
		setSearchStack(searchStack.filter(v => v.key !== data.key));
	}, [searchStack]);

	const openJewelDetail = useCallback((data) => (e) => {
		e.preventDefault();
		dispatch({
			type: LOAD_JEWEL_REQUEST,
			// data: data.id,
			id: 2
		})
		setOpenDetail(true);
	}, []);

	return (
		<div className="jewel-search-page jewel">
			<div className="jewel-search-wrap">
				<div className="search-filter-box">
					<h3>검색 필터링</h3>
					<p>블럭을 클릭하면 필터링이 취소돼요</p>
					<div className="filter-attr-box">
							<div className="filter-block-box">
							{searchRegion !== [] && searchRegion.map((c, i) => {
								return (
									<div key={(i)} className="filter-block region" onClick={removeRegion(c)}>
										{c.value}
									</div>
								)
							})}
							{searchTheme.map((c, i) => {
								return (
									<div key={(i)} className="filter-block theme" onClick={removeTheme(c)}>
										{c.value}
									</div>
								)
							})}
							{searchResult.map((c, i) => {
								return (
									<div key={(i)} className="filter-block result" onClick={removeResult(c)}>
										{c.value}
									</div>
								)
							})}
							{searchStack.map((c, i) => {
								return (
									<div key={(c.key)} className="filter-block stack" style={{background: c.color}} onClick={removeStack(c)}>
										{c.value}
									</div>
								)
							})}
						</div>
					</div>
					<p>아래에서 필터를 선택해주세요</p>
					<div className="choice-filter-box">
						<SelectAttr value={searchRegion} status="many" idx={13} name="지역" data={region} getAction={OCSearchRegion} />
						<SelectAttr value={searchTheme} status="many" idx={14} name="목적" data={themes} getAction={OCSearchTheme} />
						<SelectAttr value={searchResult} status="many" idx={15} name="결과물" data={dummyResult} getAction={OCSearchResult} />
						<SelectPeriod />
						<SelectStack skills={skills} value={searchStack} getAction={OCSearchStack}/>
					</div>
				</div>
			</div>
			<div className="jewel-card-wrap">
				{jewels.map((c, i) => {
					return (
						<JewelCard data={c} key={(i)} onClick={openJewelDetail(c)}/>
					);
				})}
			</div>
			<JewelDetail open={openDetail} setOpen={setOpenDetail} jewelData={jewelData}/>
		</div>
	);
};

FindJewel.propTypes = {

};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
	})
	context.store.dispatch({
		type: LOAD_COMMON_REQUEST,
	})
	 context.store.dispatch({
	 	type: LOAD_JEWEL_LIST_REQUEST,
	 })
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});


export default FindJewel;
