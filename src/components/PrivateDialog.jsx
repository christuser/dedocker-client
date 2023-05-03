import "../styles/PrivateDialog.css";
import { Box, CircularProgress, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updatePrivateRepo } from "../api/repository";
import { getUser } from "../api/user";
import { Loader } from "./Loader";
import { getWalletAddress } from "../utils/wallet";
import { PremiumTemplate } from "./PremiumTemplate";

export const PrivateDialog = ({ image, isOpen, handleExternalClose }) => {
	const [loading, setLoading] = useState(false);
	const [dialogLoading, setDialogLoading] = useState(true);
	const [isPremium, setIsPremium] = useState(false);
	const [open, setOpen] = useState(false);

	async function checkPremium() {
		try {
			setDialogLoading(true);
			const currentAddress = await getWalletAddress();

			const user = await getUser(currentAddress);
			setDialogLoading(false);
			setIsPremium(user.premium);
		} catch (err) {
			console.log(err.message);
			setDialogLoading(false);
		}
	}

	const handleClose = () => {
		setOpen(false);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	async function makePrivate(image) {
		setLoading(true);
		await updatePrivateRepo(image);
		setLoading(true);
		window.location.reload();
	}

	useEffect(() => {
		if (isOpen) {
			checkPremium();
			setOpen(true);
		}
	}, [isOpen]);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
			{dialogLoading ? (
				<Loader />
			) : !isPremium ? (
				<PremiumTemplate />
			) : (
				<Box
					sx={{
						backgroundColor: "#e9e9e9",
						padding: "12px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h2>Private Repository</h2>
					<Box sx={{ mt: 2, mb: 2, fontSize: "16px", fontWeight: "600" }}>
						Do you wish to make it {image.private ? "public" : "private"}?
					</Box>
					<Box
						sx={{
							cursor: "pointer",
							padding: "8px 12px",
							borderRadius: "4px",
							backgroundColor: "#ff92a2",
							color: "white",
							width: "fit-content",
							fontWeight: "600",
							minWidth: "100px",
							display: "flex",
							justifyContent: "center",
						}}
						onClick={() => makePrivate(image)}
					>
						{loading ? (
							<CircularProgress size={14} sx={{ color: "white" }} />
						) : (
							`Make ${image.private ? "Public" : "Private"}`
						)}
					</Box>
				</Box>
			)}
		</Dialog>
	);
};
