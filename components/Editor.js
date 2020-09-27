import dynamic from 'next/dynamic';

const Editor = dynamic(import ('./Toast'), {
	ssr: false
});

export default Editor;
