import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import moment from "moment";
import Router from "next/router";
import Calendar from "../../../components/DynamicCalendar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";

export const Editor = dynamic(import("../../../components/Toast"), {
	ssr: false,
});

import SelectBlocks from "../../../components/buttons/SelectBlocks";
import SelectStackForProject from "../../../components/buttons/SelectStackForProject";
import useInput from "../../../hooks/useInput";
import BackGround from "../../BackGround";
import Confirm from "../../../components/Confirm";

import ProjectPage from "./ProjectPage";

const WriteProject = () => {
	const [title, OCTitle] = useInput("");

	const [createRegion, setCreateRegion] = useState([]);
	const [createTheme, setCreateTheme] = useState([]);
	const [createResult, setCreateResult] = useState([]);
	const [createStacks, setCreateStacks] = useState([]);

	const [desc, setDesc] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [clickDate, setClickDate] = useState(false);
	const [warning, setWarning] = useState("");
	const [period, setPeriod] = useState("");
	const [done, setDone] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [aniCN, setAniCN] = useState("next");

	const dispatch = useDispatch();

	const { region, skills, themes, results } = useSelector(
		(state) => state.common
	);
	const { isCreating, isCreated, createError } = useSelector(
		(state) => state.project
	);

	const [availPage, setAvailPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const getCreateRegion = useCallback(
		(data) => {
			setCreateRegion([...createRegion, data]);
		},
		[createRegion]
	);
	const getCreateTheme = useCallback(
		(data) => {
			setCreateTheme([...createTheme, data]);
		},
		[createTheme]
	);

	const getCreateResult = useCallback(
		(data) => {
			setCreateResult([...createResult, data]);
		},
		[createResult]
	);

	const getCreateStack = useCallback(
		(data) => {
			setCreateStacks([...createStacks, data]);
		},
		[createStacks]
	);

	const removeTheme = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setCreateTheme(createTheme.filter((v) => v.key !== data.key));
		},
		[createTheme]
	);

	const removeResult = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setCreateResult(createResult.filter((v) => v.key !== data.key));
		},
		[createResult]
	);

	const removeRegion = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setCreateRegion(createRegion.filter((v) => v.key !== data.key));
		},
		[createRegion]
	);

	const removeStack = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setCreateStacks(createStacks.filter((v) => v.key !== data.key));
		},
		[createStacks]
	);

	const ClickNext = useCallback(
		(idx) => (e) => {
			e.preventDefault();
			if (idx === 1) {
				if (
					createTheme.length === 0 ||
					createResult.length === 0 ||
					createRegion.length === 0
				)
					return;
				else if (idx === availPage) setAvailPage(2);
			} else if (idx === 2) {
				if (createStacks.length === 0) return;
				else if (idx === availPage) setAvailPage(3);
			} else if (idx === 3) {
				if (period === 0) return;
				else if (idx === availPage) setAvailPage(4);
			} else if (idx === 4) {
				if (title === "") return;
				else if (idx === availPage) setAvailPage(5);
			} else if (idx === 5) {
				if (desc === "") return;
				else if (idx === availPage) {
					setDone(true);
					setAvailPage(6);
				}
			} else {
				setConfirm(true);
				return;
			}
			setAniCN("next");
			setCurrentPage(currentPage + 1);
		},
		[
			availPage,
			currentPage,
			createTheme,
			createResult,
			title,
			createRegion,
			period,
			createStacks,
			desc,
		]
	);

	const ClickBefore = useCallback(
		(e) => {
			e.preventDefault();
			setAniCN("before");
			setCurrentPage(currentPage - 1);
		},
		[currentPage]
	);

	const OCStartDate = useCallback((date) => {
		if (date.getTime() < new Date().getTime()) {
			setClickDate(false);
			setWarning("이전 날짜는 선택할 수 없습니다.");
		} else {
			setWarning("");
			setClickDate(true);
			setStartDate(date);
		}
	}, []);

	const OCPeriod = useCallback(
		(e) => {
			if (e.target.value.match(/[0-9]+/g) || e.target.value === "") {
				setPeriod(e.target.value);
			}
		},
		[period]
	);

	const headerClick = useCallback(
		(e, idx) => {
			if (idx + 1 > availPage) return;
			if (currentPage > idx + 1) setAniCN("before");
			else setAniCN("next");
			setCurrentPage(idx + 1);
		},
		[availPage, aniCN]
	);

	const closeConfirm = useCallback((e) => {
		e.preventDefault();
		setConfirm(false);
	}, []);

	const createProject = useCallback((e) => {
		e.preventDefault();
		console.log("ok");
	});

	return (
		<>
			<BackGround open={confirm} setOpen={setConfirm}>
				<Confirm
					closeFunction={closeConfirm}
					confirmFunction={createProject}
					content="작성한 내용으로 생성하시겠습니까?"
					confirm="넹 !"
					close="아니용 !"
					loading={isCreating}
				/>
			</BackGround>
			<AppBar position="static">
				<Tabs
					value={availPage - 1}
					onChange={headerClick}
					variant="scrollable"
					scrollButtons="off"
				>
					<Tab
						className="header-tap"
						label={1}
						style={{
							background: `${
								0 < availPage
									? "linear-gradient(#7990ff, #9198e5)"
									: "#dadada"
							}`,
						}}
					></Tab>
					<Tab
						className="header-tap"
						label={2}
						style={{
							background: `${
								1 < availPage
									? "linear-gradient(#7990ff, #9198e5)"
									: "#dadada"
							}`,
						}}
					></Tab>
					<Tab
						className="header-tap"
						label={3}
						style={{
							background: `${
								2 < availPage
									? "linear-gradient(#7990ff, #9198e5)"
									: "#dadada"
							}`,
						}}
					></Tab>
					<Tab
						className="header-tap"
						label={4}
						style={{
							background: `${
								3 < availPage
									? "linear-gradient(#7990ff, #9198e5)"
									: "#dadada"
							}`,
						}}
					></Tab>
					<Tab
						className="header-tap"
						label={5}
						style={{
							background: `${
								4 < availPage
									? "linear-gradient(#7990ff, #9198e5)"
									: "#dadada"
							}`,
						}}
					></Tab>
					<Tab
						className="header-tap"
						label={"Finish"}
						style={{
							background: `${
								5 < availPage
									? "linear-gradient(#7990ff, #9198e5)"
									: "#dadada"
							}`,
						}}
					></Tab>
				</Tabs>
			</AppBar>
			<div id="write-project-page">
				<div className="create-wrap ai-jc-center">
					<div
						className={
							"one-page-component " +
							(currentPage === 1 ? aniCN : "")
						}
					>
						<div className="content-box">
							<div className="selector">
								<p>어떤 목적으로 프로젝트를 모집하세요?</p>
								<SelectBlocks
									data={themes}
									value={createTheme}
									setValue={getCreateTheme}
									removeValue={removeTheme}
								/>
								<p>어떤 결과를 목표로 하시나요?</p>
								<SelectBlocks
									data={results}
									value={createResult}
									setValue={getCreateResult}
									removeValue={removeResult}
								/>
								<p>어느 지역에서 진행하시겠어요?</p>
								<SelectBlocks
									data={region}
									value={createRegion}
									setValue={getCreateRegion}
									removeValue={removeRegion}
								/>
							</div>
						</div>
					</div>
					<div
						className={
							"one-page-component " +
							(currentPage === 2 ? aniCN : "")
						}
					>
						<div className="content-box">
							<div className="selector">
								<p>
									모집하고 싶은 기술을 가진 사람들을
									설정해주세요.
								</p>
								<div className="setting-box">
									<SelectStackForProject
										data={skills}
										value={createStacks}
										setValue={getCreateStack}
										removeValue={removeStack}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						className={
							"one-page-component " +
							(currentPage === 3 ? aniCN : "")
						}
					>
						<div className="content-box">
							<div className="selector">
								{warning === "" ? (
									<p>프로젝트 시작일을 선택해주세요.</p>
								) : (
									<p className="warn">{warning}</p>
								)}
								<div className="setting-box">
									<Calendar
										value={startDate}
										onChange={OCStartDate}
										calendarType="US"
									/>
									<div className="set-period">
										{clickDate && (
											<div className="period-box">
												<p>선택하신 날짜가 맞나요?</p>
												<div className="highlight period-text">
													<h5>시작</h5>
													<KeyboardArrowRight />
													<span>
														{moment(
															startDate
														).format(
															"YYYY년 MM월 DD일"
														)}
													</span>
												</div>
												<p>
													프로젝트 진행 기간을
													입력해주세요.
												</p>
												<div className="period-text period">
													<h5>기간</h5>
													<KeyboardArrowRight />
													<input
														value={period}
														onChange={OCPeriod}
														maxLength={4}
														type="text"
														name="name"
														pattern="[\d]{4}"
														autoComplete="off"
														placeholder="0"
														autoFocus
													/>
													<p>일</p>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={
							"one-page-component " +
							(currentPage === 4 ? aniCN : "")
						}
					>
						<div className="content-box">
							<div className="selector">
								<p>모집글 제목을 어떻게 하시겠어요?</p>
								<input
									name="title"
									type="text"
									value={title}
									onChange={OCTitle}
									placeholder="제목을 입력해주세요."
									autoFocus
								/>
							</div>
						</div>
					</div>
					<div
						className={
							"one-page-component editor " +
							(currentPage === 5 ? aniCN : "")
						}
					>
						<div className="content-box">
							<div className="selector">
								<p>
									프로젝트에 대한 자세한 설명을 작성해주세요.
								</p>
								<Editor editorValue={desc} OCV={setDesc} />
							</div>
						</div>
					</div>
					<div
						className={
							"one-page-component " +
							(currentPage === 6 ? aniCN : "")
						}
					>
						<div className="content-box finish overflowAuto">
							<div className="selector">
								{done && (
									<ProjectPage
										data={{
											title: title,
											theme: createTheme,
											result: createResult,
											region: createRegion,
											period: {
												startDate: moment(
													startDate
												).format("YYYY년 MM월 DD일"),
												diff: period,
											},
											stacks: createStacks,
											description: desc,
										}}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				{done && currentPage === 6 && (
					<button className="proj-create-btn" onClick={ClickNext(6)}>
						모집 시작
					</button>
				)}
				{currentPage > 1 && (
					<button className="slide-btn back" onClick={ClickBefore}>
						<KeyboardArrowLeft />
					</button>
				)}
				{currentPage < 6 && (
					<button
						className="slide-btn next"
						onClick={ClickNext(currentPage)}
					>
						<KeyboardArrowRight />
					</button>
				)}
			</div>
		</>
	);
};

export default WriteProject;
