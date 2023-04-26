import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { WelcomeScreen } from "./Welcome";
import { Navbar } from "../components/Navbar";

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
					<Box className="body">
						<Box className="main-title">
							<p className="nft-title">Decentralized docker registry</p>
							<p>
								<span className="nft-title">powered by Spheron</span>
							</p>
						</Box>
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
				</div>
			)}
		</Box>
	);
};
