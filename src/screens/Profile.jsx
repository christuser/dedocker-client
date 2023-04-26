import "./Profile.css";
import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { userRepositories } from "../api/repository";
import { BsFiles } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { Code } from "../components/Code";
import { MdContentCopy } from "react-icons/md";

export const Profile = () => {
	const [token, setToken] = useState("");
	const [open, setOpen] = useState(false);
	const [images, setImages] = useState([]);
	const [isSettings, setIsSettings] = useState(false);

	const { user } = useParams();

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	async function getImages(user) {
		const repos = await userRepositories(user);
		setImages(repos);
	}

	async function checkIfuserLoggedIn() {
		const token = localStorage.getItem("token");
		if (token && token !== "") {
			setToken(token);
		}
	}

	useEffect(() => {
		getImages(user);
		checkIfuserLoggedIn();
	}, [user]);

	return (
		<Box>
			<Navbar />
			<Box sx={{ px: "256px", display: "flex", flexDirection: "column" }}>
				<Box className="profile">
					<Box className="profile-navigation">
						<Box onClick={() => setIsSettings(false)} className="item">
							<p>Images</p>
							<BsFiles />
						</Box>
						{token !== "" && (
							<Box onClick={() => setIsSettings(true)} className="item">
								<p>Settings</p>
								<IoSettingsOutline />
							</Box>
						)}
					</Box>
					{isSettings ? (
						<Box sx={{ flex: 1 }}>
							<h2>Settings</h2>
							<br />
							<h3>CLI</h3>
							<p style={{ fontWeight: "500", marginTop: "4px" }}>
								In order to push images from your computer you need to login to
								CLI using the token provided below. Enter to below command in
								powershell or command line.
							</p>
							<Code
								text="$ dedocker login -t &lt;your-token&gt;"
								sx={{ mt: 1, width: "fit-content" }}
							/>
							<br />
							<h3>Token</h3>
							<Tooltip
								title="Copied!"
								placement="top"
								open={open}
								onClose={handleTooltipClose}
							>
								<Box
									sx={{
										fontFamily: "monospace",
										borderRadius: "8px",
										backgroundColor: "rgb(225, 225, 225)",
										padding: "12px",
										mt: 3,
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "fit-content",
										cursor: "pointer",
									}}
									onClick={() => {
										navigator.clipboard.writeText(token);
										handleTooltipOpen();
									}}
								>
									Click to copy the token
									<MdContentCopy
										style={{
											marginLeft: "12px",
										}}
										size={20}
										className="copy-icon"
									/>
								</Box>
							</Tooltip>
						</Box>
					) : (
						<Box sx={{ flex: 1 }}>
							{images.map((d, i) => {
								const img = d.data;
								return (
									<Box className="repoimage" key={i}>
										<Box
											display="flex"
											alignItems={"center"}
											justifyContent={"space-between"}
										>
											<Box>
												<h3>{img.name}</h3>
												<Box className="tag">:{img.tag}</Box>
											</Box>
											<Code text={`dedocker pull ${img.name}:${img.tag}`} />
										</Box>
										<p
											style={{
												marginTop: "12px",
												fontWeight: "500",
												fontSize: "12px",
											}}
										>
											Uploaded at {new Date(img.timestamp).toDateString()}
										</p>
									</Box>
								);
							})}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
