import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { enablePremium } from "../api/user";
import Web3 from "web3";
import { getWalletAddress } from "../utils/wallet";
import DedockerInterface from "../contracts/Dedocker.json";

export const PremiumTemplate = () => {
	const [loading, setLoading] = useState(false);

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
					alert("You have purchased premium🥳🍾");
					window.location.reload();
				});
			console.log(resp);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	return (
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
			<Box sx={{ display: "flex", flexDirection: "column", fontWeight: "500" }}>
				<p style={{ marginBottom: "6px" }}>✅&nbsp; Make images private </p>

				<p style={{ marginBottom: "6px" }}>✅&nbsp; Unlimited private repos</p>
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
	);
};
