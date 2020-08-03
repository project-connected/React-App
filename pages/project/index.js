import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

const Ipt = ({name, val, OCF}) => {
	return (
		<div className="ipt-line">
			<div>
				{name}
			</div>
			<input value={val} onChange={OCF} placeholder={`${name} 을 입력하세요.`}/>
		</div>
	)
}

const CreateProj = props => {
	const [title, OCTitle] = useInput('');
	const [subject, OCSebject] = useInput('');
	const [description, OCDesription] = useInput('');

	return (
		<div>
			<h1>프로젝트 만들기</h1>
			<Ipt name="제목" val={title} OCF={OCTitle} />
			<Ipt name="주제" val={subject} OCF={OCSebject} />
			<textarea value={description} onChange={OCDesription} placeholder="프로젝트를 설명해주세요." />
		</div>
	);
};

CreateProj.propTypes = {

};

export default CreateProj;


// 지역 ( + 온라인)
// 기간 - 캘린더로 선택
// 주제
// 테마 - list
// 최대인원 -> 테이블과 연결
// 테이블 (스택, 인원) -> 최대인원으로 자동 합
// 프로젝트 설명(텍스트)
