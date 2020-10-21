import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

// css import
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'codemirror/lib/codemirror.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-calendar/dist/Calendar.css';
import '../css/default.scss';
import '../css/design.scss';
import '../css/layout.scss';
import '../css/mainPage.scss';
import '../css/signup.scss';
import '../css/chat.scss';
import '../css/project.scss';
import '../css/forms.scss';
import '../css/buttons.scss';
import '../css/jewel.scss';
import '../css/profile.scss';
import '../css/material-ui.scss';

import AppLayout from '../containers/AppLayout';

const Connected = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0"
				/>
				<title>Connected</title>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Permanent+Marker"
				/>
				<link
					rel="stylesheet"
					href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/default.min.css"
				/>
				<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/highlight.min.js"></script>
				<script>hljs.initHighlightingOnLoad();</script>
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
