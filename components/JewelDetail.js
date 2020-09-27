import React, {useCallback} from 'react';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import moment from 'moment';

import { useSelector } from 'react-redux';

const JewelDetail = ({ open, setOpen, jewelData, mode="component" }) => {
	const { user } = useSelector(state=>state.user);

	const userName = jewelData ? jewelData.user.userName : '사용자';

	const CloseDetail = useCallback((e) => {
		e.preventDefault();
		if (mode === 'component')
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
								{user.userId === jewelData.user.userId ?
									<>
										<Link
											href={`/jewel/write/${jewelData.id}`}
										>
											<a className="btn edit">
											수정하기
											</a>
										</Link>
										<div className="btn remove">
											삭제하기
										</div>
									</>
								:
									<>
									<Link href={`/user/${jewelData.user.userId}`}>
										<a className="btn profile">PROFILE</a>
									</Link>
									<div className="btn message">
										MESSAGE
									</div>
									</>
								}
							</div>
						</div>
						<div className="row-sep-box">
							<div className="one-side-box">
								<div className="one-info">
									<p>{userName}님의 희망 지역</p>
									<div className="info">
										{jewelData.region[0].value}
									</div>
								</div>
								<div className="one-info">
									<p>{userName}님의 프로젝트 희망 테마</p>
									<div className="info">
										{jewelData.theme[0].value}
									</div>
								</div>
								<div className="one-info">
									<p>{userName}님의 프로젝트 희망 결과</p>
									<div className="info">
										{jewelData.result[0].value}
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
			{ mode === 'component' && <div className={backgroundClass} onClick={CloseDetail} />}
			</>
		}
		</>
	)
}

export default JewelDetail;
