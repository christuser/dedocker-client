import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import BgImg from "../assets/background-spheron.png";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { createUser } from "../api/user";

export const Navbar = () => {
	const [connectedToSite, setConnectedToSite] = useState(false);

	async function connectSite() {
		await connectWalletToSite();
		const address = await getWalletAddress();
		if (address && address !== "") {
			const token = localStorage.getItem("token");
			setConnectedToSite(true);
			if (!token || token === "") {
				await createUser(address);
			}
		}
	}

	useEffect(() => {
		connectSite();
	}, []);

	return (
		<Box sx={{ position: "relative" }}>
			<Box
				sx={{
					p: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#ff92a2",
					color: "white",
					fontWeight: "700",
				}}
			>
				🎗️ Things might break 🎗️
			</Box>
			<Box
				position={"absolute"}
				right={0}
				sx={{
					backgroundImage: `url('${BgImg}')`,
					backgroundPosition: "right",
					backgroundRepeat: "no-repeat",
					width: "100vw",
					height: "100vh",
					filter: "brightness(2)",
					zIndex: -1,
				}}
			></Box>
			<div className="navbar">
				<div
					onClick={() => {
						window.location.replace("/");
					}}
				>
					<h1>⚡Dedocker</h1>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box className="navlist">
						<p onClick={() => window.location.replace("/explore")}>Explore</p>
						<p>Github</p>
					</Box>
					{!connectedToSite ? (
						<Box onClick={connectSite} className="upload-button">
							Connect Wallet
						</Box>
					) : (
						<Box className="profile-icon">
							<BsPerson size={30} />{" "}
						</Box>
					)}
				</div>
			</div>
		</Box>
	);
};
