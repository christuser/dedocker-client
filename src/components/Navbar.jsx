import React, { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import BgImg from "../assets/background-spheron.png";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { createUser } from "../api/user";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const [connectedToSite, setConnectedToSite] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	async function connectSite() {
		await connectWalletToSite();
		const address = await getWalletAddress();
		if (address && address !== "") {
			let token = localStorage.getItem("token");
			localStorage.setItem("address", address);
			if (!token || token === "") {
				await createUser(address);
			}
			token = localStorage.getItem("token");
			if (token && token !== "") {
				setConnectedToSite(true);
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
						navigate("/");
					}}
					style={{ cursor: "pointer" }}
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
						<Box>
							<Box className="profile-icon" onClick={handleClick}>
								<BsPerson size={30} />{" "}
							</Box>
							<Menu
								sx={{ top: "4px" }}
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<MenuItem
									onClick={() => {
										const address = localStorage.getItem("address");
										navigate("/profile/" + address);
										setAnchorEl(null);
									}}
								>
									<p
										style={{
											marginRight: "4px",
											fontSize: "14px",
										}}
									>
										Profile
									</p>
									<MdOutlinePersonOutline size={20} />
								</MenuItem>
								<MenuItem
									onClick={() => {
										localStorage.removeItem("token");
										window.location.replace("/");
										setAnchorEl(null);
									}}
								>
									<p
										style={{
											marginRight: "4px",
											fontSize: "14px",
										}}
									>
										Logout
									</p>
									<HiOutlineLogout size={20} />
								</MenuItem>
							</Menu>
						</Box>
					)}
				</div>
			</div>
		</Box>
	);
};
