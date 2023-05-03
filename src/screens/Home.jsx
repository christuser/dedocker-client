import "../styles/app-body.css";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { WelcomeScreen } from "./Welcome";
import { Navbar } from "../components/Navbar";
import { Code } from "../components/Code";
import { RiTwitterLine } from "react-icons/ri";
import { IoMdOpen } from "react-icons/io";

export const Home = () => {
	const [input, setInput] = useState("");
	const [isWelcomeScreen, setIsWelcomeScreen] = useState(false);

	function onCloseWelcome() {
		setIsWelcomeScreen(false);
	}

	const handleKeyDown = (event) => {
		const value = event.target.value;
		if (event.key === "Enter" && value !== "") {
			window.location.replace(`/explore?query=${value}`);
		}
	};

	const onSearch = (event) => {
		if (input !== "") {
			window.location.replace(`/explore?query=${input}`);
		}
	};

	useEffect(() => {
		const isWelcome = localStorage.getItem("welcome");
		if (isWelcome !== "true") {
			setIsWelcomeScreen(true);
		}
	}, []);

	return (
		<Box>
			{isWelcomeScreen ? (
				<WelcomeScreen onCloseWelcome={onCloseWelcome} />
			) : (
				<div className="App">
					<Navbar />
					<Box className="app-body">
						<Box className="body">
							<Box className="home-main-title">
								<p className="nft-title">Decentralized docker registry</p>
								<p>
									<span className="nft-title">Pay once, free forever.</span>
								</p>
							</Box>
							<p
								className="home-main-title"
								style={{
									fontSize: "12px",
									fontWeight: "600",
								}}
							>
								*Free for public repos, premium to make it private.
							</p>
							{/* Search Bar */}
							<Box
								sx={{
									width: { xs: "85vw", sm: "70vw", md: "35vw" },
									backgroundColor: "white",
									padding: "12px 4px 12px 24px",
									display: "flex",
									alignItems: "center",
									borderRadius: "28px",
									border: "0.5px solid grey",
								}}
								className="search"
							>
								<TbSearch
									onClick={onSearch}
									color="grey"
									cursor={"pointer"}
									size={18}
								/>
								<input
									type="search"
									id="search"
									onKeyDown={handleKeyDown}
									placeholder="Search registry..."
									value={input}
									onInput={(e) => setInput(e.target.value)}
									style={{ border: "none", marginLeft: "12px" }}
								/>
							</Box>
						</Box>
						<Box
							sx={{
								pb: 2,
								px: 2,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
								maxWidth: "1080px",
							}}
						>
							<Box
								className="built-for"
								onClick={() =>
									window.open("https://dapp-a-thon.devpost.com/", "__blank")
								}
							>
								<p>built for dapp-a-thon</p>
								<IoMdOpen style={{ color: "black" }} />
							</Box>
							<Code
								text="$ npm install -g dedocker"
								sx={{ width: "fit-content" }}
							/>
							<Box className="homepage-footer">
								<p>
									<a
										href="https://twitter.com/leostelon"
										target={"_blank"}
										rel="noreferrer"
									>
										<RiTwitterLine />
										@leostelon
									</a>
								</p>
							</Box>
						</Box>
					</Box>
				</div>
			)}
		</Box>
	);
};
