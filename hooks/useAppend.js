import {useState, useCallback} from 'react';

const useAppend = (initValue=null) => {
	const [value, setter] = useState(initValue);
	const appendHandler = useCallback((data) => {
		setter([...value, data]);
	}, [value]);
	return [value, setter, appendHandler];
}

export default useAppend;
