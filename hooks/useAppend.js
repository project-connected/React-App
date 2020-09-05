import {useState, useCallback} from 'react';

export default (initValue=null) => {
	const [value, setter] = useState(initValue);
	const appendHandler = useCallback((data) => {
		setter([...value, data]);
	}, [value]);
	return [value, setter, appendHandler];
}
