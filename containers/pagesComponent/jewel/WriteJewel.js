import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import moment from "moment";
import Calendar from "../../../components/DynamicCalendar";

import { KeyboardArrowDown, Check } from "@material-ui/icons";

import Editor from "../../../components/Editor";
import useInput from "../../../hooks/useInput";
import SelectBlocks from "../../../components/buttons/SelectBlocks";
import BackGround from "../../../containers/BackGround";
import Confirm from "../../../components/Confirm";

import { CREATE_JEWEL_REQUEST } from "../../../reducers/jewel";

const WriteJewel = () => {
	const dispatch = useDispatch();

	const { skills, region, themes, results } = useSelector(
		(state) => state.common
	);
	const { isSubmitting, isSubmitted } = useSelector((state) => state.jewel);

	const [title, OCTitle] = useInput("");
	const [regionState, setRegion] = useState([]);
	const [themeState, setTheme] = useState([]);
	const [resultState, setResult] = useState([]);
	const [period, setPeriod] = useState({
		startDate: new Date(),
		endDate: new Date(),
		diff: 0,
	});
	const [stackState, setStacks] = useState([]);
	const [desc, setDesc] = useState("");
	const [iptStatus, setIptStatus] = useState(1);
	const [endDateAvail, setEndDateAvail] = useState(false);
	const [periodWarn, setPeriodWarn] = useState("");

	const [confirmWindow, setConfirmWindow] = useState(false);

	const scrollRef = useRef();

	const getRegion = useCallback(
		(data) => {
			setRegion([...regionState, data]);
		},
		[regionState]
	);

	const getTheme = useCallback(
		(data) => {
			setTheme([...themeState, data]);
		},
		[themeState]
	);

	const getResult = useCallback(
		(data) => {
			setResult([...resultState, data]);
		},
		[resultState]
	);

	const removeTheme = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setTheme(themeState.filter((v) => v.key !== data.key));
		},
		[themeState]
	);

	const removeResult = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setResult(resultState.filter((v) => v.key !== data.key));
		},
		[resultState]
	);

	const removeRegion = useCallback(
		(data) => (e) => {
			e.preventDefault();
			setRegion(regionState.filter((v) => v.key !== data.key));
		},
		[regionState]
	);

	const nextIptvisible = useCallback(
		(e) => {
			e.preventDefault();

			if (iptStatus === 1) {
				if (
					themeState.length === 0 ||
					resultState.length === 0 ||
					regionState.length === 0 ||
					stackState.length === 0
				)
					return;
			} else if (iptStatus === 2) {
				if (period.startDate.getTime() === period.endDate.getTime())
					return;
			} else if (iptStatus === 3) {
				if (title === "") return;
			} else {
				if (desc === "") return;
				else {
					setConfirmWindow(true);
					return;
				}
			}
			setIptStatus(iptStatus + 1);
		},
		[
			iptStatus,
			themeState,
			resultState,
			title,
			regionState,
			period,
			stackState,
			desc,
		]
	);

	const OCStartDate = useCallback(
		(date) => {
			if (date.getTime() < new Date().getTime()) {
				setPeriodWarn("오늘 이후 날짜를 선택해주세요.");
				setEndDateAvail(false);
			} else {
				setPeriodWarn("");
				setPeriod({ ...period, startDate: date });
				setEndDateAvail(true);
			}
		},
		[period]
	);

	const OCEndDate = useCallback(
		(date) => {
			if (date.getTime() <= period.startDate.getTime()) {
				setPeriodWarn("시작일 이후 날짜로 선택해주세요.");
			} else {
				setPeriodWarn("");
				setPeriod({
					...period,
					endDate: date,
				});
			}
		},
		[period]
	);

	const getStack = useCallback(
		(stack) => {
			setStacks([...stackState, stack]);
		},
		[stackState]
	);

	const removeStack = useCallback(
		(stack) => (e) => {
			e.preventDefault();
			setStacks(stackState.filter((v) => v.key !== stack.key));
		},
		[stackState]
	);

	const closeConfirm = useCallback((e) => {
		e.preventDefault();
		setConfirmWindow(false);
	}, []);

	const submitJewel = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: CREATE_JEWEL_REQUEST,
				data: {
					area: regionState,
					skill: stackState,
					theme: themeState,
					purpose: resultState,
					title: title,
					content: desc,
					startDate: period.startDate,
					endDate: period.endDate,
				},
			});
		},
		[regionState, resultState, themeState, stackState, title, desc]
	);

	useEffect(() => {
		if (period.startDate.getTime() < period.endDate.getTime()) {
			setPeriod({
				...period,
				diff:
					(period.endDate.getTime() - period.startDate.getTime()) /
					(24 * 60 * 60 * 1000),
			});
		}
	}, [period.startDate, period.endDate]);

	useEffect(() => {
		if (isSubmitted) {
			alert("등록되었습니다.");
			Router.push("/jewel");
		}
	}, [isSubmitted]);

	return (
		<>
			<BackGround open={confirmWindow} setOpen={setConfirmWindow}>
				<Confirm
					closeFunction={closeConfirm}
					confirmFunction={submitJewel}
					content="작성한 내용으로 전송하시겠습니까?"
					confirm="넹 !"
					close="아니용 !"
					loading={isSubmitting}
				/>
			</BackGround>
			<div id="new-jewel-wrap" ref={scrollRef}>
				<div
					className={`new-jewel-page ${
						iptStatus > 0 ? "visible" : ""
					}`}
				>
					<div className="new-jewel-content boxShadow">
						<h3 className="title">1.</h3>
						<p>어떤 목적의 프로젝트를 하고 싶으신가요?</p>
						<SelectBlocks
							data={themes}
							value={themeState}
							setValue={getTheme}
							removeValue={removeTheme}
						/>
						<p>어떤 결과물을 만들어보고 싶으신가요?</p>
						<SelectBlocks
							data={results}
							value={resultState}
							setValue={getResult}
							removeValue={removeResult}
						/>
						<p>어느 지역에서 진행하고 싶으신가요?</p>
						<SelectBlocks
							data={region}
							value={regionState}
							setValue={getRegion}
							removeValue={removeRegion}
						/>
						<p>어떤 스택으로 참여하시고 싶으신가요?</p>
						<SelectBlocks
							data={skills}
							value={stackState}
							setValue={getStack}
							removeValue={removeStack}
						/>
					</div>
				</div>
				<div
					className={`new-jewel-page ${
						iptStatus > 1 ? "visible" : ""
					}`}
				>
					<div className="new-jewel-content boxShadow">
						<h3 className="title">2.</h3>
						{periodWarn === "" ? (
							<p>원하는 프로젝트 진행 기간을 선택해주세요.</p>
						) : (
							<p className="warn">{periodWarn}</p>
						)}
						<div className="seperate-box period">
							<div className="calendar-box">
								<p>시작일을 선택해주세요.</p>
								<Calendar
									value={period.startDate}
									onChange={OCStartDate}
									calendarType="US"
								/>
							</div>
							{endDateAvail && (
								<div className="calendar-box">
									<p>마감일을 선택해주세요.</p>
									<Calendar
										value={period.endDate}
										onChange={OCEndDate}
										calendarType="US"
									/>
								</div>
							)}
						</div>
						{period.diff > 0 && periodWarn === "" && (
							<div className="period-info-box">
								<div>
									<p>시작일</p>
									<span>
										<b>
											{moment(period.startDate).format(
												"YYYY년 MM월 DD일"
											)}
										</b>
									</span>
								</div>
								<div>
									<p>마감일</p>
									<span>
										<b>
											{moment(period.endDate).format(
												"YYYY년 MM월 DD일"
											)}
										</b>
									</span>
								</div>
								<div>
									<p>기간</p>
									<span>
										총 <b>{period.diff}</b>일
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					className={`new-jewel-page ${
						iptStatus > 2 ? "visible" : ""
					}`}
				>
					<div className="new-jewel-content boxShadow">
						<h3 className="title">3.</h3>
						<p>제목을 입력해주세요.</p>
						<input
							name="title"
							value={title}
							onChange={OCTitle}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									nextIptvisible(e);
								}
							}}
						/>
					</div>
				</div>
				<div
					className={`new-jewel-page editor ${
						iptStatus > 3 ? "visible" : ""
					}`}
				>
					<div className="new-jewel-content boxShadow">
						<h3 className="title">4.</h3>
						<p>자세한 자기 소개를 작성해주세요.</p>
						<Editor
							editorValue={desc}
							OCV={setDesc}
							height="70vh"
						/>
					</div>
				</div>
				<button className="next" onClick={nextIptvisible}>
					{iptStatus >= 4 ? <Check /> : <KeyboardArrowDown />}
				</button>
			</div>
		</>
	);
};

export default WriteJewel;
