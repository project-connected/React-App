import React from 'react';

const JewelCard = ({ data, onClick }) => {
	return (
		<div className="card-box" onClick={onClick}>
			<div className="back-img blur" style={{backgroundImage: `url(${data.user.profileImg})`}}/>
			<div className='jewel-card-content'>
				<img className="profile-img" src={data.user.profileImg}/>
				<div className='jewel-card-text'>
					<h6>@ {data.user.userName}</h6>
					<h2>{data.title}</h2>
					<div className="multi-content">
						<span>{data.region[0].value}</span>
					</div>
					<div className="multi-content">
						<span>{data.theme[0].value}</span>
						<span>{data.result[0].value}</span>
					</div>
					<div className="multi-content stack">
						{data.stacks.map((c, i) => {
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
