import dynamic from 'next/dynamic';
import Skeleton from '@material-ui/lab/Skeleton'

const Editor = dynamic(import ('./Toast'), {
	loading: () => (<Skeleton variant="rect" width={'100%'} height={'600px'} />),
	ssr: false
});

export default Editor;
