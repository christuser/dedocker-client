import "./Explore.css";
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { getRepositories, searchRepositories } from "../api/repository";
import { SearchComponent } from "../components/search/SearchComponent";
import { MdContentCopy } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { getShortAddress } from "../utils/addressShort";
import { useLocation, useNavigate } from "react-router-dom";

export const Explore = () => {
	const [images, setImages] = useState([]);

	const search = useLocation().search;
	const query = new URLSearchParams(search).get("query");
	const navigate = useNavigate();

	async function getImages() {
		const repos = await getRepositories();
		setImages(repos);
	}

	async function searchImages(query) {
		const repos = await searchRepositories(query);
		setImages(repos);
	}

	useEffect(() => {
		if (query && query !== "") {
			searchImages(query);
		} else {
			getImages();
		}
	}, [query]);

	return (
		<Box>
			<Navbar />
			<Box sx={{ px: "256px", display: "flex", flexDirection: "column" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<h2>Explore</h2>
					<SearchComponent />
				</Box>
				<Box mt={2}>
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
									<Box className="copy-code">
										<p>
											dedocker pull {img.name}:{img.tag}
										</p>
										<MdContentCopy
											style={{
												marginLeft: "12px",
											}}
											size={20}
											className="copy-icon"
										/>
									</Box>
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

								<Box className="creator">
									<p>Maintained by&nbsp;</p>
									<Box
										sx={{
											"&:hover": {
												textDecoration: "underline",
											},
											cursor: "pointer",
										}}
										onClick={() => navigate("/profile/" + img.creator)}
									>
										{getShortAddress(img.creator)}
									</Box>
									<IoMdOpen
										style={{ color: "black" }}
										className="open-creator-icon"
									/>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};
