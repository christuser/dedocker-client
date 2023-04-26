import { Box } from "@mui/material";
import React from "react";
import { MdContentCopy } from "react-icons/md";

export const Code = ({ text = "", sx = {} }) => {
	return (
		<Box className="copy-code" sx={sx}>
			<p>{text}</p>
			<MdContentCopy
				style={{
					marginLeft: "12px",
				}}
				size={20}
				className="copy-icon"
			/>
		</Box>
	);
};
