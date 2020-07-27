import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

// css import
import 'bootstrap/dist/css/bootstrap.css';
import '../css/layout.scss';
import '../css/mainPage.scss';

import AppLayout from '../containers/AppLayout';

const Connected = ({ Component }) => {
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
