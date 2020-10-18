import React from "react";
import { useSelector } from "react-redux";

import JewelDetail from "../../../components/JewelDetail";

const JewelPage = () => {
	const { jewelData } = useSelector((state) => state.jewel);

	return (
		<div className="jewel-page-box">
			<JewelDetail mode="page" jewelData={jewelData} open={true} />
		</div>
	);
};

JewelPage.propTypes = {};

export default JewelPage;
