import { Box } from "@mui/material";
import React, { useState } from "react";
import { PrivateDialog } from "./PrivateDialog";

export const MakePrivateButton = ({ image }) => {
	const [privateDialogOpen, setPrivateDialogOpen] = useState(false);

	function handlePrivateDialogClose() {
		setPrivateDialogOpen(false);
	}

	return (
		<Box>
			<PrivateDialog
				isOpen={privateDialogOpen}
				handleExternalClose={handlePrivateDialogClose}
				image={image}
			/>
			<Box
				sx={{
					cursor: "pointer",
					padding: 0.5,
					borderRadius: "4px",
					"&:hover": {
						backgroundColor: "#ff92a2",
						color: "white",
					},
				}}
				onClick={() => setPrivateDialogOpen(true)}
			>
				Make {image.private ? "Public" : "Private"}
			</Box>
		</Box>
	);
};
