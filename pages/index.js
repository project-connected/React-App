import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Visibility } from "@material-ui/icons";

const ProjectCard = () => {
	return (
		<Link href="/">
			<a className="project-card">
				<div className="project-card-img-container">
					<img src="https://cdn.inflearn.com/wp-content/uploads/react.png" />
				</div>
				<div className="project-card-info">
					<div className="project-card-line">
						<h3>프로젝트 제목</h3>
					</div>
					<div className="project-card-line">
						<span>헤커톤</span>
						<span>6 month</span>
						<span>2명 / 5명</span>
					</div>
					<p>
					discriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscriptiondiscription
					</p>
				</div>
				<div className="project-card-footer">
					<div className="project-card-view">
						<Visibility />
						<span>20</span>
					</div>
				</div>
			</a>
		</Link>
	);
}

const MainPage = props => {
	const dummy = [1,2,3,4,5,6];

	return (
		<div className="main-page-wrap">
			<h1>현재 모집 중인 프로젝트</h1>
			<div className="project-card-container">
				{dummy.map((i) => {
					return (
						<ProjectCard key={(i)}/>
					)
				})}
			</div>
		</div>
	);
};

MainPage.propTypes = {

};

export default MainPage;
