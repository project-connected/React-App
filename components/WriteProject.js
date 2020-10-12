import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import Router from "next/router";
import Calendar from "./DynamicCalendar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
export const Editor = dynamic(import("./Toast"), {
	ssr: false,
});

import SelectBlocks from "./buttons/SelectBlocks";
import SelectStackForProject from "./buttons/SelectStackForProject";
import useInput from "../hooks/useInput";
import BackGround from "../containers/BackGround";
import Confirm from "./Confirm";

import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { ProjectPage } from "../pages/project/[index]";

const CreateHeader = ({ idx, availIdx, clickFunction }) => {
	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const ref4 = useRef();
	const ref5 = useRef();
	const refFinish = useRef();

	const [refArray] = useState([ref1, ref2, ref3, ref4, ref5, refFinish]);

	const [indicatorStyle, setIndecatorStyle] = useState({
		width: "16px",
	});

	useEffect(() => {
		if (idx > availIdx) return;

		refArray.forEach((rf) => {
			rf.current.classList.remove("current");
		});

		refArray[idx - 1].current.classList.add("current");

		setIndecatorStyle({
			width: idx === 1 ? "16px" : refArray[idx - 1].current.offsetWidth,
			left: refArray[idx - 1].current.offsetLeft,
		});
	}, [idx, availIdx]);

	return (
		<div id="project-create-header">
			<div className="project-create-header-box">
				<div
					className="page-btn current"
					ref={ref1}
					onClick={clickFunction(1)}
				>
					1
				</div>
				<div className="page-btn" ref={ref2} onClick={clickFunction(2)}>
					2
				</div>
				<div className="page-btn" ref={ref3} onClick={clickFunction(3)}>
					3
				</div>
				<div className="page-btn" ref={ref4} onClick={clickFunction(4)}>
					4
				</div>
				<div className="page-btn" ref={ref5} onClick={clickFunction(5)}>
					5
				</div>
				<div
					className="page-btn"
					ref={refFinish}
					onClick={clickFunction(6)}
				>
					FINISH
				</div>
				<span className="nav-indicator" style={indicatorStyle} />
			</div>
		</div>
	);
};

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

	const dispatch = useDispatch();

	const { region, skills, themes, results } = useSelector(
		(state) => state.common
	);
	const { isCreating, isCreated, createError } = useSelector(
		(state) => state.project
	);

	const [availPage, setAvailPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const slideStyle = {
		transform: `translateX(-${(currentPage - 1) * 100}%)`,
	};

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
			console.log(idx);
			console.log(slideStyle);
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
			setCurrentPage(idx + 1);
		},
		[availPage]
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
			{/* <CreateHeader
				idx={currentPage}
				availIdx={availPage}
				clickFunction={headerClick}
			/> */}
			<AppBar position="static">
				<Tabs value={availPage - 1} onChange={headerClick}>
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
				<div className="create-wrap">
					<div className="one-page-component" style={slideStyle}>
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
					<div className="one-page-component" style={slideStyle}>
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
					<div className="one-page-component" style={slideStyle}>
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
					<div className="one-page-component" style={slideStyle}>
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
						className="one-page-component editor"
						style={slideStyle}
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
					<div className="one-page-component" style={slideStyle}>
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
				{availPage === 6 && (
					<button className="proj-create-btn" onClick={ClickNext(6)}>
						모집 시작
					</button>
				)}
			</div>
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
		</>
	);
};

export default WriteProject;
