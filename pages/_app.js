import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import wrapper from '../store/configureStore';

const Connected = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>Connected</title>
			</Head>
			<div>
				hello connected
			</div>
		</>
	);
};

Connected.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Connected);
