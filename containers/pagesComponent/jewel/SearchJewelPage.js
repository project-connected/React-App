import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import LoadingCircles, {
	LoadingBox100P,
} from '../../../components/LoadingCircles';
import SelectAttr from '../../../components/buttons/SelectAttr';
import SelectPeriod from '../../../components/buttons/SelectPeriod';
import SelectStack from '../../../components/buttons/SelectStack';

import {
	FILTER_JEWEL_LIST_REQUEST,
	LOAD_JEWEL_LIST_REQUEST,
	LOAD_JEWEL_REQUEST,
} from '../../../reducers/jewel';

const JewelDetail = dynamic(import('../../../components/JewelDetail'), {
	loading: () => <LoadingCircles />,
});

const JewelCard = dynamic(import('../../../components/JewelCard'), {
	loading: () => <Skeleton variant="rect" className="card-box" />,
});

const SearchJewelPage = () => {
	const { region, themes, skills, results } = useSelector(
		(state) => state.common,
	);
	const { jewelData, isLoadingList } = useSelector((state) => state.jewel);
	const { jewels } = useSelector((state) => state.jewel);
	const dispatch = useDispatch();

	const [searchRegion, setSearchRegion] = useState([]);
	const [searchTheme, setSearchTheme] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [searchStack, setSearchStack] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [openDetail, setOpenDetail] = useState(false);

	const OCSearchRegion = useCallback(
		(data) => {
			setSearchRegion([...searchRegion, data]);
		},
		[searchRegion],
	);

	const OCSearchTheme = useCallback(
		(data) => {
			setSearchTheme([...searchTheme, data]);
		},
		[searchTheme],
	);

	const OCSearchResult = useCallback(
		(data) => {
			setSearchResult([...searchResult, data]);
		},
		[searchResult],
	);

	const OCSearchStack = useCallback(
		(data) => {
			setSearchStack([...searchStack, data]);
		},
		[searchStack],
	);

	const removeRegion = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchRegion(searchRegion.filter((v) => v.key !== data.key));
		},
		[searchRegion],
	);
	const removeTheme = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchTheme(searchTheme.filter((v) => v.key !== data.key));
		},
		[searchTheme],
	);
	const removeResult = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchResult(searchResult.filter((v) => v.key !== data.key));
		},
		[searchRegion],
	);
	const removeStack = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchStack(searchStack.filter((v) => v.key !== data.key));
		},
		[searchStack],
	);

	const openJewelDetail = useCallback(
		(data) => (e) => {
			e.preventDefault();
			console.log(data);
			dispatch({
				type: LOAD_JEWEL_REQUEST,
				id: data.profileId,
				//id: 2
			});
			setOpenDetail(true);
		},
		[],
	);

	useEffect(() => {
		if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
			alert('기간을 확인해주세요.');
			return;
		}
		// if (
		// 	searchStack.length == 0 &&
		// 	searchTheme.length == 0 &&
		// 	searchResult.length == 0 &&
		// 	searchStack.length == 0 &&
		// 	!startDate &&
		// 	!endDate
		// ) {
		// 	dispatch({
		// 		type: LOAD_JEWEL_LIST_REQUEST,
		// 	});
		// } else {
		dispatch({
			type: FILTER_JEWEL_LIST_REQUEST,
			data: {
				theme: searchTheme,
				purpose: searchResult,
				area: searchRegion,
				startDate: startDate,
				endDate: endDate,
				skill: searchStack,
			},
		});
		// }
	}, [
		searchTheme,
		searchResult,
		searchRegion,
		searchStack,
		startDate,
		endDate,
	]);

	return (
		<div className="jewel-search-page jewel">
			<div className="jewel-search-wrap">
				<div className="search-filter-box">
					<h3>검색 필터링</h3>
					<p>블럭을 클릭하면 필터링이 취소돼요</p>
					<div className="filter-attr-box">
						<div className="filter-block-box">
							{startDate && (
								<div
									className="filter-block startDate"
									onClick={() => setStartDate(null)}
								>
									{moment(startDate).format(
										'YYYY년 MM월 DD일',
									)}
								</div>
							)}
							{endDate && (
								<div
									className="filter-block endDate"
									onClick={() => setEndDate(null)}
								>
									{moment(endDate).format('YYYY년 MM월 DD일')}
								</div>
							)}
							{searchRegion !== [] &&
								searchRegion.map((c, i) => {
									return (
										<div
											key={i}
											className="filter-block region"
											onClick={removeRegion(c)}
										>
											{c.value}
										</div>
									);
								})}
							{searchTheme.map((c, i) => {
								return (
									<div
										key={i}
										className="filter-block theme"
										onClick={removeTheme(c)}
									>
										{c.value}
									</div>
								);
							})}
							{searchResult.map((c, i) => {
								return (
									<div
										key={i}
										className="filter-block result"
										onClick={removeResult(c)}
									>
										{c.value}
									</div>
								);
							})}
							{searchStack.map((c, i) => {
								return (
									<div
										key={c.key}
										className="filter-block stack"
										style={{ background: c.color }}
										onClick={removeStack(c)}
									>
										{c.value}
									</div>
								);
							})}
						</div>
					</div>
					<p>아래에서 필터를 선택해주세요</p>
					<div className="choice-filter-box">
						<SelectAttr
							value={searchRegion}
							status="many"
							idx={13}
							name="지역"
							data={region}
							getAction={OCSearchRegion}
						/>
						<SelectAttr
							value={searchTheme}
							status="many"
							idx={14}
							name="목적"
							data={themes}
							getAction={OCSearchTheme}
						/>
						<SelectAttr
							value={searchResult}
							status="many"
							idx={15}
							name="결과물"
							data={results}
							getAction={OCSearchResult}
						/>
						<SelectPeriod
							value={startDate}
							setValue={setStartDate}
						/>
						<SelectPeriod
							name="종료일"
							index={99}
							value={endDate}
							setValue={setEndDate}
						/>
						<SelectStack
							skills={skills}
							value={searchStack}
							getAction={OCSearchStack}
						/>
					</div>
				</div>
			</div>
			<div className="jewel-card-wrap">
				{!jewels || (jewels && jewels.length == 0) ? (
					<div>검색 결과가 없습니다.</div>
				) : isLoadingList ? (
					<>
						<Skeleton variant="rect" className="card-box" />
						<Skeleton variant="rect" className="card-box" />
						<Skeleton variant="rect" className="card-box" />
						<Skeleton variant="rect" className="card-box" />
						<Skeleton variant="rect" className="card-box" />
						<Skeleton variant="rect" className="card-box" />
					</>
				) : (
					jewels.map((c, i) => {
						return (
							<JewelCard
								data={c}
								key={i}
								onClick={openJewelDetail(c)}
							/>
						);
					})
				)}
				<i area-hidden="true"></i>
				<i area-hidden="true"></i>
			</div>
			<JewelDetail
				open={openDetail}
				setOpen={setOpenDetail}
				jewelData={jewelData}
			/>
		</div>
	);
};

SearchJewelPage.propTypes = {};

export default SearchJewelPage;
