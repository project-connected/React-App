import React, {useState, useCallback} from 'react';
import { Close, Reply, Chat } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CLOSE_APPLY } from '../../reducers/component';
import StackBlock from '../StackBlock';

const dummyStack = [
	{
		name: 'Node.JS',
		color: 'rgb(65, 169, 76)',
	}, {
		name: 'photoshop',
		color: '#187bcd',
	}, {
		name: 'React.JS',
		color: '#03254c',
	}, {
		name: 'Swift',
		color: '#FC6A03',
	}
];

const RequestMember = ({  }) => {
	const dispatch = useDispatch();

	const [selectStackIndex, setSelectStackIndex] = useState(-1);

	const selectStack = useCallback((idx) => (e) => {
		e.preventDefault();
		console.log(idx);
		if (idx !== selectStackIndex) {
			setSelectStackIndex(idx);
		} else {
			setSelectStackIndex(-1);
		}
	}, [selectStackIndex]);

	return (
		<div className="req-mem-wrap">
			<button className="exit-btn" onClick={() => dispatch({ type: CLOSE_APPLY })}>
				<Close />
			</button>
			<h3>지원하기</h3>
			<div className="stack-container">
				<h6>지원 포지션</h6>
				<div className="project-card-stack-block-wrap">
					{dummyStack.map((c, i) => {
						return (
							<button key={(i)} onClick={selectStack(i)} className={selectStackIndex === i ? 'selected' : null}>
								<StackBlock name={c.name} color={c.color}/>
							</button>
						);
					})}
				</div>
			</div>
			<div>
				<h6>자기소개</h6>
				<textarea />
			</div>
			<div>
				<p>프로필과 함께 전송됩니다.</p>
				<button className="req-btn apply">
					<div className="logo">
						<Reply />
					</div>
					<div className="req-btn-hover">
						지원하기
					</div>
				</button>
				<button className="req-btn message">
					<div className="logo">
						<Chat />
					</div>
					<div className="req-btn-hover">
						대화하기
					</div>
				</button>
			</div>
		</div>
	);
};

RequestMember.propTypes = {

};

export default RequestMember;
