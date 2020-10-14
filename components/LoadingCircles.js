import React from "react";

const LoadingCircles = () => {
	return (
		<>
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</>
	);
};

export const LoadingBox = () => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#FFF",
			}}
		>
			<LoadingCircles />
		</div>
	);
};
export default LoadingCircles;
