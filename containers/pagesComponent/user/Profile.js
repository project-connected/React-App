import React, { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
	EmailOutlined,
	ChatOutlined,
	CreateOutlined,
	ThumbUp,
	Mood,
	MoodBad,
	KeyboardArrowDown,
} from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import { LoadingBox100P } from '../../../components/LoadingCircles';
import { defaultProfile } from '../../../config/config';
import StackBlock from '../../../components/StackBlock';

const JewelDetail = dynamic(import('../../../components/JewelDetail'), {
	loading: () => <LoadingBox100P />,
});

const SubProfileComponent = ({ other }) => {
	return (
		<>
			<div className="subProfile-wrap">
				<div className="subProfile-box mult">
					<div>
						<h3 className="title">REGION</h3>
						<span>
							{!other.area ? (
								<span className="noInfo">
									등록한 지역이 없습니다.
								</span>
							) : (
								other.area[0].value
							)}
						</span>
					</div>
					<div>
						<h3 className="title">URL</h3>
						<span>
							{other.url !== '' ? (
								<a href={other.url} target="_blank">
									{other.url}
								</a>
							) : (
								<span className="noInfo">
									등록한 URL이 없습니다.
								</span>
							)}
						</span>
					</div>
				</div>
				<div className="subProfile-box">
					<h3 className="title">STACK</h3>
					<div className="block-content-wrap stack">
						{other.skill.length === 0 && (
							<span className="noInfo">
								등록한 STACK이 없습니다.
							</span>
						)}
						{other.skill.map((c, i) => {
							return (
								<div
									className="block-content stack boxShadow"
									key={i}
									style={{ background: `${c.color}` }}
								>
									{c.value}
								</div>
							);
						})}
					</div>
				</div>
				<div className="subProfile-box">
					<h3 className="title">THEME</h3>
					<div className="block-content-wrap">
						{other.theme.length === 0 && (
							<span className="noInfo">
								등록한 관심 테마가 없습니다.
							</span>
						)}
						{other.theme.map((c, i) => {
							return (
								<div className="block-content string" key={i}>
									{c.value}
								</div>
							);
						})}
					</div>
				</div>
				<div className="subProfile-box">
					<h3 className="title">DEST</h3>
					<div className="block-content-wrap">
						{other.purpose.length === 0 && (
							<span className="noInfo">
								등록한 관심 분야가 없습니다.
							</span>
						)}
						{other.purpose.map((c, i) => {
							return (
								<div className="block-content string" key={i}>
									{c.value}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="subProfile-box">
				<h3 className="title">INTRODUCT</h3>
				<div className="block-content-wrap introduct">
					<ReactMarkdown
						source={
							other.introduct !== ''
								? other.introduct
								: `작성한 내용이 없습니다.`
						}
					/>
				</div>
			</div>
		</>
	);
};

const PrevProject = ({ data, pagefunc, pageRef }) => {
	const [clicked, setClicked] = useState(false);

	const click = useCallback(
		(e) => {
			e.preventDefault();
			setClicked(!clicked);
		},
		[clicked],
	);

	const clName = clicked
		? 'prevProject boxShadow clicked'
		: 'prevProject boxShadow';

	return (
		<div className={clName}>
			<div className="score-box">
				<ThumbUp />
				<div>{data.score.toFixed(2)}</div>
			</div>
			<div className="content-box">
				<p className="period">
					{data.startDate} ~ {data.endDate}
				</p>
				<div className="content">
					<h4>{data.title}</h4>
					<div className="stack-box">
						{data.part.stack.map((c, i) => {
							return (
								<StackBlock
									name={c.value}
									color={c.color}
									key={i}
								/>
							);
						})}
					</div>
				</div>
				<div className="eval-box">
					<p>프로젝트 팀원들의 평가입니다.</p>
					<div className="eval-list">
						{data.evaluations.map((c, i) => {
							return (
								<div className="eval" key={i}>
									{c.score >= 2.5 ? <Mood /> : <MoodBad />}
									<h5>{c.score}</h5>
									<span>{c.content}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="btn-box">
					<p>
						아래 버튼을 클릭하시면 해당 프로젝트 상세 페이지로
						이동합니다.
					</p>
					<Link href={`/project/${data.id}`}>
						<a target="_blank" className="btn">
							상세보기
						</a>
					</Link>
				</div>
			</div>
			<div className="openBtn" onClick={click}>
				<KeyboardArrowDown />
			</div>
		</div>
	);
};

const PrevProjects = ({ data, userName, pagefunc }) => {
	const averageScore = (
		data.reduce((a, b) => a + (b.score || 0), 0) / data.length
	).toFixed(2);

	return (
		<div className="prevProject-container">
			<div className="score">
				<div className="header">
					<p>
						지금까지의 팀원들이 생각한 <b>{userName}</b>님은
					</p>
					<div>
						{averageScore}
						<span>점!</span>
					</div>
				</div>
			</div>
			<div className="prevProject-wrap">
				<hr />
				<p>지금까지 진행한 프로젝트들</p>
				<div className="prevProject-list">
					{data.map((c, i) => {
						return (
							<PrevProject data={c} key={i} pagefunc={pagefunc} />
						);
					})}
				</div>
			</div>
		</div>
	);
};

const Profile = () => {
	const { other, user } = useSelector((state) => state.user);

	const [wrapHeight, setWrapHeight] = useState(0);

	const [viewIdx, setViewIdx] = useState(1);

	const clickViewBtn = useCallback(
		(idx) => (e) => {
			setViewIdx(idx);
		},
		[],
	);

	const slideStyle = {
		transform: `translateX(${(viewIdx - 1) * 100 * -1}%)`,
	};

	const wrapStyle = { height: `${wrapHeight}px` };

	return (
		<div id="profile-wrap">
			<div className="profile-box left">
				<img
					className="profile-img boxShadow"
					src={other.profileImg ? other.profileImg : defaultProfile}
				/>
				<div className="user-name">
					<b>{other.userName}</b>
				</div>
				<div className="info-line">
					<EmailOutlined />
					{other.email}
				</div>
				<div className="chat-btn">
					{user && user.userId === other.userId ? (
						<Link href={`/user/edit`}>
							<a>
								<CreateOutlined />
								수정하기
							</a>
						</Link>
					) : (
						<>
							<ChatOutlined />
							채팅하기
						</>
					)}
				</div>
			</div>
			<div className="profile-box right">
				<div className="detail-profile-header">
					<div
						className={
							viewIdx == 1
								? 'detail-profile-btn clicked boxShadow'
								: 'detail-profile-btn boxShadow'
						}
						onClick={clickViewBtn(1)}
					>
						정보
					</div>
					<div
						className={
							viewIdx == 2
								? 'detail-profile-btn clicked boxShadow'
								: 'detail-profile-btn boxShadow'
						}
						onClick={clickViewBtn(2)}
					>
						프로젝트
					</div>
					<div
						className={
							viewIdx == 3
								? 'detail-profile-btn clicked boxShadow'
								: 'detail-profile-btn boxShadow'
						}
						onClick={clickViewBtn(3)}
					>
						인재풀
					</div>
				</div>
				<div className="detail-profile-wrap boxShadow">
					<div className="detail-profile-box">
						{viewIdx === 1 && (
							<div className="detail-profile">
								<SubProfileComponent other={other} />
							</div>
						)}
						{viewIdx === 2 && (
							<div className="detail-profile project">
								{other.projectData.length > 0 ? (
									<PrevProjects
										data={other.projectData}
										userName={other.userName}
										pagefunc={setWrapHeight}
									/>
								) : (
									<div className="empty-info">
										해당 사용자는 완료한 프로젝트가 없어요.
									</div>
								)}
							</div>
						)}
						{viewIdx === 3 && (
							<div className="detail-profile jewel">
								{other.jewelData ? (
									<JewelDetail
										open={true}
										mode="page"
										jewelData={other.jewelData}
									/>
								) : (
									<div className="empty-info">
										해당 사용자는 현재 인재풀에 등록한
										정보가 없어요.
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

Profile.propTypes = {};

export default Profile;
