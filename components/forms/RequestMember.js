import React from 'react';
import { Close } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CLOSE_APPLY } from '../../reducers/component';

const RequestMember = ({  }) => {
	const dispatch = useDispatch();
	return (
		<div className="req-mem-wrap">
			<button className="exit-btn" onClick={() => dispatch({ type: CLOSE_APPLY })}>
				<Close />
			</button>
			<h3>지원하기</h3>
			<div>
				스택 체크
			</div>
			<div>
				자기소개
			</div>
			<p>프로필과 함께 전송됩니다.</p>
			<div>
				<button>버튼1</button>
				<button>버튼2</button>
			</div>
		</div>
	);
};

RequestMember.propTypes = {

};

export default RequestMember;
