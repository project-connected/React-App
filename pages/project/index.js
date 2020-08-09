import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
	GET_REGION_FOR_SEARCH, GET_THEME_FOR_SEARCH, OPEN_FILTER_ATTR,
} from '../../reducers/project';

import SelectAttr from '../../components/buttons/SelectAttr';
import SelectPeriod from '../../components/buttons/SelectPeriod';
import SelectStack from '../../components/buttons/SelectStack';

const SearchProj = props => {
	const { filterAttrOpenIndx } = useSelector(state=>state.project);
	const dispatch = useDispatch();

	const openAttr = useCallback((idx) => (e) => {
		e.preventDefault();
		if (idx === filterAttrOpenIndx) {
			dispatch({
				type: OPEN_FILTER_ATTR,
				data: -1,
			})
			return ;
		}
		dispatch({
			type: OPEN_FILTER_ATTR,
			data: idx,
		})
	}, [filterAttrOpenIndx]);

	return (
		<div className="proj-search-page">
			<div className="proj-etc-wrap">
				<Link href="/project/create">
					<a>
						<div id="create">
						프로젝트 만들기 버튼
						</div>
					</a>
				</Link>
				<Link href="/">
					<a>
						<div id="apply">
						인재풀 등록 버튼
						</div>
					</a>
				</Link>
				<div className="etc-link">
					<Link href="/">
						<a>
							마감 임박
						</a>
					</Link>
					<Link href="/">
						<a>
							관심있을 프로젝트
						</a>
					</Link>
				</div>
			</div>
			<div className="proj-search-wrap">
				<div className="search-filter-box">
					<h3>검색 필터링</h3>
					<div className="choice-filter-box">
						<SelectAttr clickFunc={openAttr(0)} idx={0} name="지역" data={['서울', '대전', '대구', '부산']} getAction={GET_REGION_FOR_SEARCH} />
						<SelectAttr clickFunc={openAttr(1)} idx={1} name="테마" data={['어플리케이션 개발', '해커톤', '공모전']} getAction={GET_THEME_FOR_SEARCH} />
						<SelectPeriod clickFunc={openAttr(2)}/>
						<SelectStack clickFunc={openAttr(3)}/>
					</div>
					<div className="filter-attr-box">
						필터링 요소들
					</div>
					<div className="filter-btn-box">
						안내사항, 버튼
					</div>
				</div>
				<div className="proj-result-box">
					<div className="proj-result-header">해더 - 검색결과, 소트 기준 버튼</div>
					<div className="proj-result">결과들</div>
				</div>
			</div>
		</div>
	);
};

SearchProj.propTypes = {

};

export default SearchProj;
