import "../styles/PrivateDialog.css";
import Web3 from "web3";
import { Box, CircularProgress, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updatePrivateRepo } from "../api/repository";
import DedockerInterface from "../contracts/Dedocker.json";
import { enablePremium, getUser } from "../api/user";
import { Loader } from "./Loader";
import { getWalletAddress } from "../utils/wallet";

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

	async function buyPremium() {
		try {
			setLoading(true);
			const price = Web3.utils.toWei("5");
			const contract = new window.web3.eth.Contract(
				DedockerInterface.abi,
				"0xd6cBA51A40E163d30D8A47c40E2635e1F7575186"
			);
			const currentAddress = await getWalletAddress();

			// Gas Calculation
			const gasPrice = await window.web3.eth.getGasPrice();
			const gas = await contract.methods.buyDedocker().estimateGas({
				from: currentAddress,
				value: price,
			});

			const resp = await contract.methods
				.buyDedocker()
				.send({ from: currentAddress, gasPrice, gas, value: price })
				.on("receipt", async function (receipt) {
					await enablePremium();
					setLoading(false);
					window.location.reload();
				});
			console.log(resp);
		} catch (error) {
			console.log(error);
			setLoading(false);
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
				<Box
					sx={{
						backgroundColor: "#e9e9e9",
						padding: "12px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<p style={{ fontSize: "24px", fontWeight: "500" }}>Premium🦋</p>
					<br />
					<Box
						sx={{ display: "flex", flexDirection: "column", fontWeight: "500" }}
					>
						<p style={{ marginBottom: "6px" }}>✅&nbsp; Make images private </p>

						<p style={{ marginBottom: "6px" }}>
							✅&nbsp; Unlimited private repos
						</p>
						<p style={{ marginBottom: "6px" }}>✅&nbsp; Free forever </p>
						<p style={{ marginBottom: "6px" }}>✅&nbsp; Single payment</p>
					</Box>
					<br />
					<h1 style={{ fontSize: "38px" }}>
						5 SHM<span style={{ fontSize: "12px" }}> /forever</span>
					</h1>
					<Box
						sx={{
							cursor: "pointer",
							color: "white",
							width: "fit-content",
							fontWeight: "600",
							minWidth: "100px",
							display: "flex",
							justifyContent: "center",
						}}
						onClick={buyPremium}
						className="buy-now"
					>
						{loading ? (
							<CircularProgress size={14} sx={{ color: "white" }} />
						) : (
							"Buy Now"
						)}
					</Box>
				</Box>
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
