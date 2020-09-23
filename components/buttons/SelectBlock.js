import React, {useState, useCallback} from 'react';
import { KeyboardArrowUp, Search } from '@material-ui/icons';

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

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		const color = '#';
		for (let i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
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
					<div className="select-block-wrap">
						{mode === 'multi' ?
							value.map((c, i) => {
								return (
									<div className="select-block selected" key={(i)}>
										{c.value}
									</div>
								)
							})
						:
							<div className="select-block" >{value.value}</div>
						}
						<div className="close-btn" onClick={divClose}>
							<KeyboardArrowUp />
						</div>
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
