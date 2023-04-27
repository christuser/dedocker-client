import { Box, CircularProgress, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateUsername } from "../api/user";

export const UpdateNameDialog = ({ isOpen }) => {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason && reason === "backdropClick") return;
	};

	async function updateUser(username) {
		if (!username || username === "") return;
		setLoading(true);
		const response = await updateUsername(username);
		setLoading(false);
		if (response.data.updatedUsername) window.location.reload();
	}

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);

	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
				<Box>
					<h2>Update Name</h2>
					<br />
				</Box>
				<p style={{ fontWeight: "500" }}>
					Please update your username, it should be unique across the platform.
					Username's are attached to the docker image.
				</p>
				<Box
					sx={{
						p: 1,
						borderRadius: "12px",
						fontWeight: "600",
					}}
				>
					<p>🚨Username can be updated only once🚨</p>
				</Box>
				<Box sx={{ mt: 1 }}>
					<TextField
						placeholder="Enter username"
						size="small"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</Box>
				<Box
					sx={{
						mt: 1,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							padding: "8px 80px",
							backgroundColor: "#ff92a2",
							width: "fit-content",
							borderRadius: "4px",
							fontWeight: "600",
							color: "white",
							cursor: "pointer",
						}}
						onClick={() => updateUser(username)}
					>
						{loading ? (
							<CircularProgress size={"14px"} sx={{ color: "white" }} />
						) : (
							<p>Update</p>
						)}
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
