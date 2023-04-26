import "./Explore.css";
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { getRepositories, searchRepositories } from "../api/repository";
import { SearchComponent } from "../components/search/SearchComponent";
import { IoMdOpen } from "react-icons/io";
import { getShortAddress } from "../utils/addressShort";
import { useLocation, useNavigate } from "react-router-dom";
import { Code } from "../components/Code";
import { TagsDialog } from "../components/TagsDialog";
import { Loader } from "../components/Loader";

export const Explore = () => {
	const [name, setName] = useState("");
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [tagsDialogOpen, setTagsDialogOpen] = useState(false);

	const search = useLocation().search;
	const query = new URLSearchParams(search).get("query");
	const navigate = useNavigate();

	async function getImages() {
		setLoading(true);
		const repos = await getRepositories();
		setImages(repos);
		setLoading(false);
	}

	async function searchImages(query) {
		setLoading(true);
		const repos = await searchRepositories(query);
		setImages(repos);
		setLoading(false);
	}

	function handleTagDialogClose() {
		setTagsDialogOpen(false);
	}

	useEffect(() => {
		if (query && query !== "") {
			searchImages(query);
		} else {
			getImages();
		}
	}, [query]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Navbar />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "840px",
				}}
			>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<h2>Explore</h2>
					<SearchComponent />
				</Box>

				<TagsDialog
					name={name}
					isOpen={tagsDialogOpen}
					handleExternalClose={handleTagDialogClose}
				/>

				<Box mt={2}>
					{loading ? (
						<Loader />
					) : (
						images.map((d, i) => {
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
											<Box>
												<Box className="tag">:{img.tag}</Box>
												<p
													style={{
														fontWeight: "500",
														fontSize: "12px",
														marginTop: "4px",
														textDecoration: "underline",
														color: "blue",
														cursor: "pointer",
													}}
													onClick={() => {
														setName(img.name);
														setTagsDialogOpen(true);
													}}
												>
													view tags
												</p>
											</Box>
										</Box>
										<Code text={`dedocker pull ${img.name}:${img.tag}`} />
									</Box>

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
						})
					)}
				</Box>
			</Box>
		</Box>
	);
};
