import { Avatar } from '@material-ui/core';
import React from 'react';

const JewelCard = ({ data, onClick }) => {
	return (
		<div className="card-box" onClick={onClick}>
			{ data.user && data.user.profileImg ?
				<div className="back-img blur" style={{backgroundImage: `url(${data.user.profileImg})`}}/>
				:
				<div className="back-img blur" style={{background: 'linear-gradient(#7990ff, #9198e5)'}} />
			}
			<div className='jewel-card-content'>
				{ data.user && data.user.profileImg ?
					<img className="profile-img" src={data.user.profileImg}/>
					:
					<Avatar className="profile-img" style={{background: '#7990ff'}}>{data.user.userName}</Avatar>
				}

				<div className='jewel-card-text'>
					<h6>@ {data.user.userName}</h6>
					<h2>{data.title}</h2>
					<div className="multi-content">
						<span>{data.area[0].value}</span>
					</div>
					<div className="multi-content">
						<span>{data.theme[0].value}</span>
						<span>{data.purpose[0].value}</span>
					</div>
					<div className="multi-content stack">
						{data.skill.map((c, i) => {
							return (
								<div className="jewel-card-stack" key={(i)}>
									{c.value}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
};

export default JewelCard;
