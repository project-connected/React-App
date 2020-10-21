import React, { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value }) => {
	return (
		<div className="codeBlock">
			<SyntaxHighlighter language={language} style={tomorrow}>
				{value}
			</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
