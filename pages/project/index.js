import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import {
	GET_REGION_FOR_SEARCH, GET_THEME_FOR_SEARCH, OPEN_FILTER_ATTR, LOSE_STACK_FOR_SEARCH, LOSE_REGION_FOR_SEARCH, LOSE_THEME_FOR_SEARCH
} from '../../reducers/project';

import SelectAttr from '../../components/buttons/SelectAttr';
import SelectPeriod from '../../components/buttons/SelectPeriod';
import SelectStack from '../../components/buttons/SelectStack';
import StackBlock from '../../components/StackBlock';

const SearchResultProject = ({ project }) => {
	return (
		<Link href={`/project/${project.id}`}>
			<a className="searched-project">
				<div className="thumbnail"><img src={project.thumbnail_img} /></div>
				<div className="content">
					<div className="header">
						<p>{project.theme.content} | {project.result.map((c, i) => {
							if (i == 0)
								return `${c.content}`
							else
								return `, ${c.content}`
						})}</p>
						{project.title}
					</div>
					<div className="time">
						<p>{moment(project.startDate).format('YYYY년 MM월 DD일')}부터 {project.period} 일동안 진행</p>
					</div>
					<div className="stack-box">
						{project.stacks.map((st, i) => {
							return (
								<StackBlock name={st.name} color={st.color} key={(i)}/>
							)
						})}
					</div>
				</div>
			</a>
		</Link>
	);
}

const SearchProj = props => {
	const { filterAttrOpenIndx, search_region, search_theme, search_stacks, projectList } = useSelector(state=>state.project);
	const dispatch = useDispatch();

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
						<SelectAttr status="search" idx={0} name="지역" data={['서울', '대전', '대구', '부산']} getAction={GET_REGION_FOR_SEARCH} />
						<SelectAttr status="search" idx={1} name="테마" data={['어플리케이션 개발', '해커톤', '공모전']} getAction={GET_THEME_FOR_SEARCH} />
						<SelectPeriod />
						<SelectStack />
					</div>
					<div className="filter-attr-box">
						<p>블럭을 클릭하면 필터링이 취소돼요</p>
							<div className="filter-block-box">
							{search_region !== [] && search_region.map((c, i) => {
								return (
									<div key={(i)} className="filter-block region" onClick={() => dispatch({type: LOSE_REGION_FOR_SEARCH, data: c})}>
										{c}
									</div>
								)
							})}
							{search_theme.map((c, i) => {
								return (
									<div key={(i)} className="filter-block theme" onClick={() => dispatch({type: LOSE_THEME_FOR_SEARCH, data: c})}>
										{c}
									</div>
								)
							})}
							{search_stacks.map((c, i) => {
								return (
									<div key={(c.name)} className="filter-block stack" style={{background: c.color}} onClick={() => dispatch({type: LOSE_STACK_FOR_SEARCH, data: c})}>
										{c.name}
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className="proj-result-box">
					<div className="proj-result-header">
						<p className="search-result">검색결과 - {projectList.length}개</p>
						<div className="search-sort-btn-container">
							<div>최신순</div>
							<div>인기순</div>
						</div>
					</div>
					<div className="proj-results">
						{projectList.map((pj, i) => {
							return (
								<SearchResultProject project={pj} key={(i)} />
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

SearchProj.propTypes = {

};

export default SearchProj;
