import React from 'react';
import PropTypes from 'prop-types';

const MyProject = props => {
	return (
		<div>
			<div>
				<section>
					모집 중인 프로젝트
				</section>
				<section>
					지원 신청한 프로젝트
				</section>
			</div>
			<div>
				진행 중인 프로젝트
			</div>
			<div>
				완료 프로젝트
			</div>
		</div>
	);
};

MyProject.propTypes = {

};

export default MyProject;
