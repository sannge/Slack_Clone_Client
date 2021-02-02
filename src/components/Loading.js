import React from "react";
import { CircularProgress } from "@material-ui/core";

function Loading({ size }) {
	return (
		<div>
			<CircularProgress size={size} />
		</div>
	);
}

export default Loading;
