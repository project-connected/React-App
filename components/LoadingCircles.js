import React from "react";

const LoadingCircles = ({ style = null }) => {
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

export const LoadingBox100P = ({ className }) => {
	return (
		<div
			className={"loading-box " + (className ? className : "")}
			style={{
				width: "100%",
				height: "100%",
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

export const LoadingBox = () => {
	return (
		<div
			className={"loading-box " + (className ? className : "")}
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
