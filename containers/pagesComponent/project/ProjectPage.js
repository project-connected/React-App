import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { HowToVoteOutlined, Chat } from "@material-ui/icons";

import StackBlock from "../../../components/StackBlock";

import { OPEN_APPLY, OPEN_USER_MENU } from "../../../reducers/component";

const ProjectPage = ({ data = null, status = "view" }) => {
	const { user } = useSelector((state) => state.user);
	const { projectData } = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const [PJData, setPJData] = useState(data ? data : projectData);

	const applyProj = useCallback(
		(e) => {
			if (!user) {
				alert("로그인이 필요해요.");
				dispatch({
					type: OPEN_USER_MENU,
				});
			} else {
				dispatch({
					type: OPEN_APPLY,
				});
			}
		},
		[user]
	);

	useEffect(() => {
		setPJData(data);
	}, [data]);

	return (
		<div id="project-page-wrap">
			<div className="proj-head-info boxShadow">
				<div className="proj-head-title">
					<h3>{PJData.title}</h3>
				</div>
				<div className="proj-info-container">
					<section id="condition">
						<div className="info-box">
							<p>프로젝트 테마</p>
							<div className="block-wrap overDisplay">
								{PJData.theme.map((c, i) => {
									return (
										<div key={i} className="block">
											{c.value}
										</div>
									);
								})}
							</div>
						</div>
						<div className="info-box">
							<p>프로젝트 결과물</p>
							<div className="block-wrap overDisplay">
								{PJData.result.map((c, i) => {
									return (
										<div key={i} className="block">
											{c.value}
										</div>
									);
								})}
							</div>
						</div>
						<div className="info-box">
							<p>프로젝트 진행 지역</p>
							<div className="block-wrap overDisplay">
								{PJData.region.map((c, i) => {
									return (
										<div key={i} className="block">
											{c.value}
										</div>
									);
								})}
							</div>
						</div>
					</section>
					<section id="stack">
						<div className="info-box">
							<p>프로젝트 진행 기간</p>
							<div className="block-wrap period">
								<div className="block">
									{PJData.period.startDate}
								</div>
								<p>
									부터 <span>{PJData.period.diff}</span>일 간
								</p>
							</div>
						</div>
						<div className="info-box stack">
							<p>모집기술</p>
							<p className="total-num">
								{PJData.stacks.reduce(
									(a, b) => a + (b["num"] || 0),
									0
								)}{" "}
								/{" "}
								{projectData.stacks.reduce(
									(a, b) => a + (b["maxNum"] || 0),
									0
								)}
								명
							</p>
							<div className="project-card-stack-block-wrap">
								{PJData.stacks.map((c, i) => {
									return (
										<div
											key={i}
											className="proj-stack-block"
										>
											<StackBlock
												name={c.value}
												color={c.color}
											/>
											<span className="proj-stack-person">
												{c.num}/{c.maxNum} 명
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</section>
				</div>
			</div>
			{status === "view" && (
				<div className="proj-button-wrap">
					<button id="apply" onClick={applyProj}>
						<HowToVoteOutlined />
						<h3>APPLY</h3>
					</button>
					<button id="listup">
						<Chat />
						<h3>MESSAGE</h3>
					</button>
				</div>
			)}
			<div className="proj-descript boxShadow">
				<ReactMarkdown source={PJData.description} />
			</div>
		</div>
	);
};

export default ProjectPage;
