import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { backUrl } from '../config/config';

import { Editor } from '@toast-ui/react-editor';
import hljs from 'highlight.js';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';

const Toast = ({ editorValue, OCV, mirror = 'tab', height = 'inherit' }) => {
	const editorRef = useRef();

	const handleChange = useCallback(
		(e) => {
			OCV(editorRef.current.getInstance().getMarkdown());
		},
		[editorValue],
	);

	const uploadImage = (blob) => {
		let imageFormData = new FormData();
		const url = backUrl + '/file/content';

		imageFormData.append('img', blob);
		return axios
			.post(url, imageFormData, {
				withCredentials: true,
			})
			.then((res) => {
				return res;
			})
			.catch((e) => {
				console.error(e);
			});
	};

	return (
		<Editor
			initialValue={editorValue}
			previewStyle="vertical"
			height={height}
			initialEditType="markdown"
			placeholder="이곳에 글을 작성하세요"
			useCommandShortcut={true}
			ref={editorRef}
			onChange={handleChange}
			hideModeSwitch={true}
			previewStyle={mirror}
			previewHighlight={true}
			plugins={[[codeSyntaxHighlightPlugin, { hljs }]]}
			hooks={{
				addImageBlobHook: (blob, callback, source) => {
					uploadImage(blob).then((res) => {
						callback(res.data.result[0].location);
					});
					return false;
				},
			}}
		/>
	);
};

Toast.propTypes = {};

export default Toast;
