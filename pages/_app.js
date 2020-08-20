import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import AOS from 'aos';

// css import
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'codemirror/lib/codemirror.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-calendar/dist/Calendar.css';
import '../css/design.scss';
import '../css/layout.scss';
import '../css/mainPage.scss';
import '../css/signup.scss';
import '../css/chat.scss';
import '../css/project.scss';
import '../css/forms.scss';
import '../css/buttons.scss';

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
