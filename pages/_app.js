import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import AOS from 'aos';

// css import
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/design.scss';
import '../css/layout.scss';
import '../css/mainPage.scss';
import '../css/signup.scss';
import '../css/chat.scss';
import '../css/project.scss';

import AppLayout from '../containers/AppLayout';

const Connected = ({ Component }) => {
	useEffect(() => {
		AOS.init({
			duration: 1500
		});
		AOS.refresh();
	});
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>Connected</title>
			</Head>
			<AppLayout>
				<Component />
			</AppLayout>
		</>
	);
};

Connected.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Connected);
