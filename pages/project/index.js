import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const SearchProj = props => {
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
						지역, 기간, 테마, 스택
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
