import React, {useState, useCallback, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { EmailOutlined, ChatOutlined, CreateOutlined, ThumbUp, Mood, MoodBad, KeyboardArrowDown } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown'

import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../../store/configureStore';

import JewelDetail from '../../components/JewelDetail';

import { LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_COMMON_REQUEST } from '../../reducers/common';
import StackBlock from '../../components/StackBlock';

const SubProfileComponent = ({ other }) => {

	return (
		<>
			<div className="subProfile-wrap">
				<div className="subProfile-box mult">
					<div>
						<h3 className="title">
							REGION
						</h3>
						<span>{other.subProfile.region.value}</span>
					</div>
					<div>
						<h3 className="title">
							URL
						</h3>
						<span>
							<a href={other.subProfile.url} target="_blank">
								{other.subProfile.url}
							</a>
						</span>
					</div>
				</div>
				<div className="subProfile-box">
					<h3 className="title">
						STACK
					</h3>
					<div className="block-content-wrap stack">
						{other.subProfile.stacks.map((c, i) => {
							return (
								<div className="block-content stack boxShadow" key={(i)} style={{background: `${c.color}`}}>
									{c.value}
								</div>
							);
						})}
					</div>
				</div>
				<div className="subProfile-box">
					<h3 className="title">
						THEME
					</h3>
					<div className="block-content-wrap">
						{other.subProfile.theme.map((c, i) => {
							return (
								<div className="block-content string" key={(i)}>
									{c.value}
								</div>
							)
						})}
					</div>
				</div>
				<div className="subProfile-box">
					<h3 className="title">
						DEST
					</h3>
					<div className="block-content-wrap">
					{other.subProfile.result.map((c, i) => {
							return (
								<div className="block-content string" key={(i)}>
									{c.value}
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<div className="subProfile-box">
				<h3 className="title">
					INTRODUCT
				</h3>
				<div className="block-content-wrap introduct">
					<ReactMarkdown source={other.subProfile.introduct} />
				</div>
			</div>
		</>
	)
}

const PrevProject = ({ data, pagefunc, pageRef }) => {
	const [clicked, setClicked] = useState(false);

	const click = useCallback((e) => {
		e.preventDefault();
		setClicked(!clicked)
	}, [clicked])

	useEffect(() => {
		pagefunc(pageRef.current.clientHeight);
	}, [clicked]);

	const clName = clicked ? 'prevProject boxShadow clicked' : 'prevProject boxShadow';

	return (
		<div className={clName}>
			<div className="score-box">
				<ThumbUp/>
				<div>{data.score.toFixed(2)}</div>
			</div>
			<div className="content-box">
				<p className="period">{data.startDate} ~ {data.endDate}</p>
				<div className="content">
					<h4>{data.title}</h4>
					<div className="stack-box">
						{data.part.stack.map((c, i) => {
							return (
								<StackBlock name={c.value} color={c.color} key={(i)}/>
							)
						})}
					</div>
				</div>
				<div className="eval-box">
					<p>프로젝트 팀원들의 평가입니다.</p>
					<div className="eval-list">
						{data.evaluations.map((c, i) => {
							return (
								<div className="eval" key={(i)}>
									{ c.score >= 2.5 ?
										<Mood />
									:
										<MoodBad />
									}
									<h5>
										{c.score}
									</h5>
									<span>
										{c.content}
									</span>
								</div>
							)
						})}
					</div>
				</div>
				<div className="btn-box">
					<p>아래 버튼을 클릭하시면 해당 프로젝트 상세 페이지로 이동합니다.</p>
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
	)
}

const PrevProjects = ({ data, userName, pagefunc, pageRef }) => {
	const averageScore = (data.reduce((a, b) => a + (b.score || 0), 0) / data.length).toFixed(2)

	return (
		<div className="prevProject-container">
			<div className="score">
				<div className="header">
					<p>지금까지의 팀원들이 생각한 <b>{userName}</b>님은</p>
					<div>{averageScore}<span>점!</span></div>
				</div>
			</div>
			<div className="prevProject-wrap">
				<hr />
				<p>지금까지 진행한 프로젝트들</p>
				<div className="prevProject-list">
					{data.map((c, i) => {
						return (
							<PrevProject data={c} key={(i)} pagefunc={pagefunc} pageRef={pageRef}/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

const User = props => {
	const { other, user } = useSelector(state=>state.user);
	const dispatch = useDispatch();

	const [wrapHeight, setWrapHeight] = useState(0);

	const page1ref = useRef();
	const page2ref = useRef();
	const page3ref = useRef();

	const [viewIdx, setViewIdx] = useState(1);

	const clickViewBtn = useCallback((idx) => (e) => {
		e.preventDefault();
		if (idx == 1) {
			setWrapHeight(page1ref.current.clientHeight);
		} else if (idx == 2) {
			setWrapHeight(page2ref.current.clientHeight);
		} else {
			setWrapHeight(page3ref.current.clientHeight);
		}
		setViewIdx(idx);
	}, [page1ref, page2ref, page3ref])

	useEffect(() => {
		if (page1ref !== 'undefined') {
			setWrapHeight(page1ref.current.clientHeight);
		}
	}, [page1ref])

	const slideStyle = {
		transform: `translateX(${(viewIdx-1) * 100 * -1}%)`
	}

	const wrapStyle = { height: `${wrapHeight}px` };

	return (
		<div id="profile-wrap">
			<div className="profile-box left">
				<img className="profile-img boxShadow" src={other.profileImg} />
				<div className="user-name">
					<b>{other.userName}</b>
				</div>
				<div className="info-line">
					<EmailOutlined />
					{other.email}
				</div>
				<div className="chat-btn">
					{user.userId === other.userId ?
					<Link href={`/user/edit`}>
						<a>
							<CreateOutlined />
							수정하기
						</a>
					</Link>
					:
					<>
						<ChatOutlined />
						채팅하기
					</>
					}
				</div>
			</div>
			<div className="profile-box right">
				<div className="detail-profile-header">
					<div className={viewIdx == 1 ? "detail-profile-btn clicked boxShadow" : "detail-profile-btn boxShadow"}  onClick={clickViewBtn(1)}>
						정보
					</div>
					<div className={viewIdx == 2 ? "detail-profile-btn clicked boxShadow" : "detail-profile-btn boxShadow"}  onClick={clickViewBtn(2)}>
						프로젝트
					</div>
					<div className={viewIdx == 3 ? "detail-profile-btn clicked boxShadow" : "detail-profile-btn boxShadow"}  onClick={clickViewBtn(3)}>
						인재풀
					</div>
				</div>
				<div className="detail-profile-wrap boxShadow" style={wrapStyle}>
					<div className="detail-profile-box">
						<div style={slideStyle} className="detail-profile" ref={page1ref}>
							{!other.subProfile ?
								<div className="empty-info">
									해당 사용자는 아직 추가 정보를 등록하지 않았어요.
								</div>
							:
								<SubProfileComponent other={other} />
							}
						</div>
						<div style={slideStyle} className="detail-profile project" ref={page2ref}>
						{other.projectData.length > 0 ?
							<PrevProjects data={other.projectData} userName={other.userName} pagefunc={setWrapHeight} pageRef={page2ref}/>
							:
							<div className="empty-info">
								해당 사용자는 완료한 프로젝트가 없어요.
							</div>
						}
						</div>
						<div style={slideStyle} className="detail-profile jewel" ref={page3ref}>
							{other.jewelData ?
								<JewelDetail open={true} mode="page" jewelData={other.jewelData} />
								:
								<div className="empty-info">
									해당 사용자는 현재 인재풀에 등록한 정보가 없어요.
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

User.propTypes = {

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

export default User;
