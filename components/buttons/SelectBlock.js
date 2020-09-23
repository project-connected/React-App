import React, {useState, useCallback, useEffect} from 'react';
import { Close, KeyboardArrowUp, Search } from '@material-ui/icons';

const SelectBlock = ({ mode="multi", data ,value, setValue, removeValue}) => {
	const [opened, setOpened] = useState(false);
	const [text, setText] = useState('');
	const [datas, setDatas] = useState(data);

	const OCText = useCallback((e) => {
		setText(e.target.value);
		setDatas(data.filter(v => v.value.toLowerCase().match(e.target.value.toLowerCase())));
	}, [text]);

	const divOpen = useCallback((e) => {
		e.preventDefault();
		setOpened(true);
	}, [])

	const divClose = useCallback((e) => {
		e.preventDefault(e);
		setOpened(false);
	})

	const clickBlock = useCallback((c) => (e) => {
		e.preventDefault();
		setValue(c);

		if (mode !== 'multi') {
			setOpened(false);
		}
	}, [value]);

	if (mode === 'multi') {
		useEffect(() => {
			setDatas(data.filter(v => !value.find(elem => elem.key === v.key)));
		}, [value]);
	}

	return (
		<div className="selectBlock">
			<div className="selected-blocks" onClick={divOpen}>
				<div className="select-block-wrap">
					{mode === 'multi' ?
						value.map((c, i) => {
							return (
								<div className="select-block multi" key={(i)}>
									{c.value}
								</div>
							)
						})
					:
						<div className="select-block" >{value.value}</div>
					}
				</div>
			</div>
			{ opened &&
				<div className="list-blocks">
					<div className="select-block-wrap selected">
						{mode === 'multi' ?
							value.map((c, i) => {
								return (
									<div className="select-block" key={(i)}>
										{c.value}
										<Close className="close-btn" onClick={removeValue(c)}/>
									</div>
								)
							})
						:
							<div className="select-block" >{value.value}</div>
						}
						<KeyboardArrowUp className="close-btn close" onClick={divClose}/>
					</div>
					<div className="block-list-search">
						<input type="text" value={text} onChange={OCText}/>
						<Search />
					</div>
					<div className="select-block-wrap list">
						<p>{mode !== 'multi' ? 'Select one option' : 'Select multiple options'}</p>
						{datas.map((c, i) => {
							return (
								<div className="select-block" key={(i)} onClick={clickBlock(c)}>
									{c.value}
								</div>
							)
						})}
					</div>
				</div>
			}
		</div>
	);
};

SelectBlock.propTypes = {

};

export default SelectBlock;
