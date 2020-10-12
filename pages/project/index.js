import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { END } from "redux-saga";

import wrapper from "../../store/configureStore";
import { LOAD_USER_REQUEST } from "../../reducers/user";

import SelectAttr from "../../components/buttons/SelectAttr";
import SelectPeriod from "../../components/buttons/SelectPeriod";
import SelectStack from "../../components/buttons/SelectStack";
import StackBlock from "../../components/StackBlock";
import { LOAD_COMMON_REQUEST } from "../../reducers/common";
import NoSubProfile from "../../containers/NoSubProfile";
import BackGround from "../../containers/BackGround";

const dummyResult = [
	{
		key: "APPLICATION",
		value: "어플리케이션 개발",
	},
	{
		key: "WEB",
		value: "웹 개발",
	},
	{
		key: "SERVER",
		value: "서버 개발",
	},
];

const SearchResultProject = ({ project }) => {
	return (
		<Link href={`/project/${project.id}`}>
			<a className="searched-project">
				<div className="thumbnail">
					<img src={project.thumbnail_img} />
				</div>
				<div className="content">
					<div className="header">
						<p>
							{project.theme[0].value} |{" "}
							{project.result.map((c, i) => {
								if (i == 0) return `${c.value}`;
								else return `, ${c.value}`;
							})}
						</p>
						{project.title}
					</div>
					<div className="time">
						<p>
							{moment(project.period.startDate).format(
								"YYYY년 MM월 DD일"
							)}
							부터 {project.period.diff} 일동안 진행
						</p>
					</div>
					<div className="stack-box">
						{project.stacks.map((st, i) => {
							return (
								<StackBlock
									name={st.value}
									color={st.color}
									key={i}
								/>
							);
						})}
					</div>
				</div>
			</a>
		</Link>
	);
};

const SearchProj = (props) => {
	const { projectList } = useSelector((state) => state.project);
	const { region, themes, skills, results } = useSelector(
		(state) => state.common
	);
	const dispatch = useDispatch();

	const [searchRegion, setSearchRegion] = useState([]);
	const [searchTheme, setSearchTheme] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [searchStacks, setSearchStacks] = useState([]);
	const [searchStartDate, setSearchStartDate] = useState(new Date());

	const getRegion = useCallback(
		(rg) => {
			setSearchRegion([...searchRegion, rg]);
		},
		[searchRegion]
	);
	const getResult = useCallback(
		(rs) => {
			setSearchResult([...searchResult, rs]);
		},
		[searchResult]
	);
	const getTheme = useCallback(
		(t) => {
			setSearchTheme([...searchTheme, t]);
		},
		[searchTheme]
	);
	const getStacks = useCallback(
		(stack) => {
			setSearchStacks([...searchStacks, stack]);
		},
		[searchStacks]
	);

	const removeTheme = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchTheme(searchTheme.filter((v) => v.key !== data.key));
		},
		[searchTheme]
	);
	const removeResult = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchResult(searchResult.filter((v) => v.key !== data.key));
		},
		[searchResult]
	);
	const removeRegion = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchRegion(searchRegion.filter((v) => v.key !== data.key));
		},
		[searchRegion]
	);
	const removeStacks = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setSearchStacks(searchStacks.filter((v) => v.key !== data.key));
		},
		[searchStacks]
	);

	return (
		<div className="proj-search-page">
			<div className="proj-search-wrap">
				<div className="search-filter-box">
					<h3>검색 필터링</h3>
					<div className="choice-filter-box">
						<SelectAttr
							status="search"
							value={searchRegion}
							idx={0}
							name="지역"
							data={region}
							getAction={getRegion}
						/>
						<SelectAttr
							status="search"
							value={searchTheme}
							idx={1}
							name="목적"
							data={themes}
							getAction={getTheme}
						/>
						<SelectAttr
							status="search"
							value={searchResult}
							idx={2}
							name="결과물"
							data={results}
							getAction={getResult}
						/>
						<SelectPeriod
							value={searchStartDate}
							setValue={setSearchStartDate}
						/>
						<SelectStack
							skills={skills}
							value={searchStacks}
							getAction={getStacks}
						/>
					</div>
					<div className="filter-attr-box">
						<p>블럭을 클릭하면 필터링이 취소돼요</p>
						<div className="filter-block-box">
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
							{searchStacks.map((c, i) => {
								return (
									<div
										key={c.key}
										className="filter-block stack"
										style={{ background: c.color }}
										onClick={removeStacks(c)}
									>
										{c.value}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="proj-result-box">
					<div className="proj-result-header">
						<p className="search-result">
							검색결과 - {projectList.length}개
						</p>
						<div className="search-sort-btn-container">
							<div>최신순</div>
							<div>인기순</div>
						</div>
					</div>
					<div className="proj-results">
						{projectList.map((pj, i) => {
							return <SearchResultProject project={pj} key={i} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : "";
		axios.defaults.headers.Cookie = "";
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
		});
		context.store.dispatch({
			type: LOAD_COMMON_REQUEST,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default SearchProj;
