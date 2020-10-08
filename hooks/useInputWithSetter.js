import {useState, useCallback} from 'react';

const useInputWithSetter =  (initValue = null) => {
	const [value, setter] = useState(initValue);
	const handler = useCallback((e) => {
		setter(e.target.value);
	}, []);
	return [value, setter, handler];
};

export default useInputWithSetter;
