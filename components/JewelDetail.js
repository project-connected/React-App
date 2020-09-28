import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Person } from '@material-ui/icons';

import Confirm from './Confirm';
import BackGround from '../containers/BackGround';

const JewelDetail = ({ open, setOpen, jewelData, mode="component" }) => {
	const { user } = useSelector(state=>state.user);
	const { isDeleting, isLoading } = useSelector(state=>state.jewel);

	const [isRemove, setRemove] = useState(false);

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
			<BackGround open={isRemove} setOpen={setRemove} zIndex={102}>
				<Confirm
					content="해당 정보를 삭제하시겠습니까?"
					confirm="네"
					close="아니오"
					closeFunction={() => setRemove(false)}
					loading={isDeleting}
					zIndex={103}
				/>
			</BackGround>
			{ isLoading ?
				<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
			:
			<div className={boxClass}>
				<div className="jewel-detail">
					<div className="back-img blur" style={{background: `url(https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg)`}}/>
					<div className="content-box">
						<div className="profile-box">
							<img className="profile-img" src='https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg' />
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
										<div className="btn remove" onClick={() => setRemove(true)}>
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
										{/* {jewelData.region[0].value} */}
										{jewelData.area[0].value}
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
										{/* {jewelData.result[0].value} */}
										{jewelData.purpose[0].value}
									</div>
								</div>
							</div>
							<div className="one-side-box">
								<p>{userName}님의 가능 스택</p>
								<div className="stack-wrap">
								{jewelData.skill.map((c, i) => {
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
			}
			{ mode === 'component' && <div className={backgroundClass} onClick={CloseDetail} />}
			</>
		}
		</>
	)
}

export default JewelDetail;
