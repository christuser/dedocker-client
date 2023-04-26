import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import { getShortAddress } from "../utils/addressShort";
import { useNavigate } from "react-router-dom";
import { Code } from "./Code";
import { IoMdOpen } from "react-icons/io";
import { getRepoTags } from "../api/repository";
import { Loader } from "./Loader";

export const TagsDialog = ({ name, isOpen, handleExternalClose }) => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [images, setImages] = useState([]);
	const [open, setOpen] = useState(false);

	async function getImages(name) {
		setLoading(true);
		const repos = await getRepoTags(name);
		setImages(repos);
		setLoading(false);
	}

	const handleClose = () => {
		setOpen(false);
		setImages([]);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	useEffect(() => {
		if (!name || name === "") return;
		if (isOpen) {
			setOpen(true);
			getImages(name);
		}
	}, [name, isOpen]);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<Box
				sx={{
					backgroundColor: "#e9e9e9",
					padding: "12px",
				}}
			>
				<h2>{name} tags</h2>
				<br />
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
					})
				)}
			</Box>
		</Dialog>
	);
};
