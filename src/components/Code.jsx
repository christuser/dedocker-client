import { Box, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export const Code = ({ text = "", sx = {} }) => {
	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<Tooltip
			title="Copied!"
			placement="top"
			open={open}
			onClose={handleTooltipClose}
		>
			<Box
				onClick={() => {
					navigator.clipboard.writeText(text);
					handleTooltipOpen();
				}}
				className="copy-code"
				sx={sx}
			>
				<p>{text}</p>
				<MdContentCopy
					style={{
						marginLeft: "12px",
					}}
					size={20}
					className="copy-icon"
				/>
			</Box>
		</Tooltip>
	);
};
