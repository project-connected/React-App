import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import moment from 'moment';

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../../store/configureStore';

import SelectAttr from '../../components/buttons/SelectAttr';
import SelectPeriod from '../../components/buttons/SelectPeriod';
import SelectStack from '../../components/buttons/SelectStack';

// import useAppend from '../../hooks/useAppend';

import { LOAD_COMMON_REQUEST } from '../../reducers/common';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_JEWEL_REQUEST } from '../../reducers/jewel';

const JewelDetail = ({ open, setOpen }) => {
	const { jewelData, isLoadingJewel, isLoadedJewel } = useSelector(state=>state.jewel);
	const userName = jewelData ? jewelData.user.userName : '사용자';

	const CloseDetail = useCallback((e) => {
		e.preventDefault();
		setOpen(false);
	}, []);

	const backgroundClass = open ? "back-btn visible" : "back-btn hide";
	const boxClass = open ? 'jewel-detail-box boxShadow visible' : 'jewel-detail-box boxShadow hide';

	return (
		<>
		{jewelData &&
			<>
			<div className={boxClass}>
				<div className="jewel-detail">
					<div className="back-img blur" style={{backgroundImage: `url(${jewelData.user.profileImg})`}}/>
					<div className="content-box">
						<div className="profile-box">
							<img className="profile-img" src={jewelData.user.profileImg} />
							<div className="user-name">{jewelData.user.userName}</div>
							<div className="btn-container">
								<Link href={`/user/${jewelData.user.userId}`}>
									<a className="btn profile">PROFILE</a>
								</Link>
								<div className="btn message">
									MESSAGE
								</div>
							</div>
						</div>
						<div className="row-sep-box">
							<div className="one-side-box">
								<div className="one-info">
									<p>{userName}님의 희망 지역</p>
									<div className="info">
										{jewelData.region.value}
									</div>
								</div>
								<div className="one-info">
									<p>{userName}님의 프로젝트 희망 테마</p>
									<div className="info">
										{jewelData.theme.value}
									</div>
								</div>
								<div className="one-info">
									<p>{userName}님의 프로젝트 희망 결과</p>
									<div className="info">
										{jewelData.result.value}
									</div>
								</div>
							</div>
							<div className="one-side-box">
								<p>{userName}님의 가능 스택</p>
								<div className="stack-wrap">
								{jewelData.stacks.map((c, i) => {
									return (
										<div key={(i)} className="jewel-card-stack" style={{background: c.color}}>
											{c.value}
										</div>
									)
								})}
								</div>
							</div>
						</div>
						<div className="profile-period">
							<div className="period-node left">
								{moment(jewelData.startData).format('YY.MM.DD')}
							</div>
							<div className="period-node right">
								{moment(jewelData.endDate).format('YY.MM.DD')}
							</div>
						</div>
						<div className="text-content">
							<ReactMarkdown source={jewelData.desc} />
						</div>
					</div>
				</div>
			</div>
			<div className={backgroundClass} onClick={CloseDetail} />
			</>
		}
		</>
	)
}

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
	}, [searchRegion]);

	const openJewelDetail = useCallback((data) => (e) => {
		e.preventDefault();
		dispatch({
			type: LOAD_JEWEL_REQUEST,
			data: data.id,
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
						<SelectAttr val={searchRegion} status="many" idx={13} name="지역" data={region} getAction={OCSearchRegion} />
						<SelectAttr val={searchTheme} status="many" idx={14} name="목적" data={themes} getAction={OCSearchTheme} />
						<SelectAttr val={searchResult} status="many" idx={15} name="결과물" data={dummyResult} getAction={OCSearchResult} />
						<SelectPeriod />
						<SelectStack skills={skills}/>
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
			<JewelDetail open={openDetail} setOpen={setOpenDetail}/>
		</div>
	);
};

const JewelCard = ({ data, onClick }) => {
	return (
		<div className="jewel-card" onClick={onClick}>
			<div className="back-img blur" style={{backgroundImage: `url(${data.user.profileImg})`}}/>
			<div className='jewel-card-content'>
				<img className="profile-img" src={data.user.profileImg}/>
				<div className='jewel-card-text'>
					<h6>@ {data.user.userName}</h6>
					<h2>{data.title}</h2>
					<div className="multi-content">
						<span>{data.region.value}</span>
					</div>
					<div className="multi-content">
						<span>{data.theme.value}</span>
						<span>{data.result.value}</span>
					</div>
					<div className="multi-content stack">
						{data.stacks.map((c, i) => {
							return (
								<div className="jewel-card-stack" key={(i)}>
									{c.value}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

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
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});


export default FindJewel;
