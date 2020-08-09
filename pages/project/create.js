import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

import useInput from '../../hooks/useInput';

const dummyRegion = [
	{
		main: "서울",
		sub: null,
	},{
		main: "부산",
		sub: null,
	},{
		main: "대구",
		sub: null,
	},{
		main: "인천",
		sub: null,
	},{
		main: "광주",
		sub: null,
	},{
		main: "대전",
		sub: null,
	},{
		main: "울산",
		sub: null,
	},{
		main: "제주",
		sub: null,
	},
	{
		main: "경기",
		sub: ["수원", "성남", "안양", "안산", "용인", "부천", "광명", "평택", "과천", "오산", "시흥", "군포", "의왕", "하남", "이천", "안성", "김포", "화성", "광주", "여주", "양평", "일산", "고양", "의정부", "구리", "남양주", "파주", "양주", "동두천", "포천", "가평"],
	},
	{
		main: "강원",
		sub: ["춘천", "원주", "강릉", "동해", "태백", "속초", "삼척", "홍천", "횡성", "영월", "평창", "정선", "철원", "화천", "양구", "인제", "고성", "양양"],
	},
	{
		main: "충북",
		sub: ["", ],
	},
	{
		main: "충남",
		sub: ["", ],
	},
	{
		main: "전북",
		sub: ["", ],
	},
	{
		main: "전남",
		sub: ["", ],
	},
	{
		main: "경북",
		sub: ["", ],
	},
	{
		main: "경남",
		sub: ["", ]
	},
	{
		main: "",
		sub: ["", ]
	}
];


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
	const [ region, OCRegion ] = useInput('지역');
	const [ subRegion, OCSubRegion ] = useInput('');

	const [ openSC, setOpenSC] = useState(false);
	const [ openEC, setOpenEC] = useState(false);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const OCStartDate = useCallback((date) => {
		setStartDate(date);
	}, [startDate]);

	const OCEndDate = useCallback((date) => {
		setEndDate(date);
	}, [endDate]);

	return (
		<div>
			<h1>프로젝트 만들기</h1>
			<Ipt name="제목" val={title} OCF={OCTitle} />
			<Ipt name="주제" val={subject} OCF={OCSebject} />
			<div className="ipt-line">
				<div>기간</div>
				<div className="calendar-wrap">
					<button onClick={()=>setOpenSC(!openSC)}>시작일</button>
					{openSC &&
						<div className="calendar">
							<Calendar
								value={startDate}
								onChange={OCStartDate}
								selectRange={true}
						/>
						</div>
					}
				</div>
				<div className="calendar-wrap">
					<button onClick={()=>setOpenEC(!openEC)}>종료일</button>
					{openEC &&
						<div className="calendar">
							<Calendar
								value={endDate}
								onChange={OCEndDate}
						/>
						</div>
					}
				</div>
			</div>
			<div className="ipt-line">
				<div>
					지역
				</div>
				<select value={region} onChange={OCRegion}>
					{dummyRegion.map((c, i) => {
						return (
							<option key={(i)} value={c.main}>{c.main}</option>
						)
					})}
				</select>
				{(region !== '지역' && dummyRegion.find(v=>v.main === region).sub !== null) &&
					<select value={subRegion} onChange={OCSubRegion}>
						{
							dummyRegion.find(v=>v.main === region).sub.map((c, i) => {
								return (
									<option key={(i)} value={c}>{c}</option>
								);
							})
						}
					</select>
				}
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<td>스택</td>
							<td>인원</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>노드</td>
							<td>3명</td>
						</tr>
					</tbody>
				</table>
				<button>
					모집 인원 추가하기
				</button>
			</div>
			<textarea value={description} onChange={OCDesription} placeholder="프로젝트를 설명해주세요." />
			<div>
				<button>모집하기</button>
				<button>취소하기</button>
			</div>
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
