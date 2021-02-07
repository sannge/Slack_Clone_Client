import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

const Image = styled.img`
	height: 70px;
	max-width: 300px;
	margin-right: 5px;
	padding: 5px;
	border: 1px solid #eee;
`;

const Video = styled.video`
	height: 70px;
	max-width: 300px;
	margin-right: 5px;
	padding: 5px;
`;
function Files({ files, setFiles, createMessageLoading }) {
	// useEffect(() => {
	// 	return () => {
	// 		ref.current.forEach((s) => {
	// 			URL.revokeObjectURL(s);
	// 		});
	// 	};
	// }, []);

	const [onTop, setOnTop] = useState(null);
	const removeFile = (fileIndex) => {
		const copyFiles = [...files];
		const filteredFiles = copyFiles.filter((_, index) => index !== fileIndex);

		setFiles(filteredFiles);
	};
	console.log(files);

	return (
		<div style={{ display: "flex", width: "400px" }}>
			{files.map((file, index) => {
				const src = URL.createObjectURL(new Blob([file]));

				return (
					<div key={index} style={{ marginRight: "12px" }}>
						{file.type.includes("video") ? (
							<div
								onMouseEnter={() => setOnTop(index + 1)}
								onMouseLeave={() => setOnTop(null)}
								style={{ position: "relative" }}>
								<Video src={src} alt='' />
								{onTop && onTop === index + 1 && (
									<div
										onClick={() => removeFile(index)}
										style={{
											position: "absolute",
											right: "-5px",
											top: "-2px",
											width: "19px",
											height: "19px",
											borderRadius: "50%",
											background: "#444444",
											color: "#eee",
											cursor: "pointer",
										}}>
										<Icon name='times' style={{ marginLeft: "1px" }} />
									</div>
								)}
							</div>
						) : (
							<div
								onMouseEnter={() => setOnTop(index + 1)}
								onMouseLeave={() => setOnTop(null)}
								style={{ position: "relative" }}>
								<Image src={src} alt='' />
								{onTop && onTop === index + 1 && !createMessageLoading && (
									<div
										onClick={() => removeFile(index)}
										style={{
											position: "absolute",
											right: "-5px",
											top: "-2px",
											width: "19px",
											height: "19px",
											borderRadius: "50%",
											background: "#444444",
											color: "#eee",
											cursor: "pointer",
										}}>
										<Icon style={{ marginLeft: "1px" }} name='times' />
									</div>
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Files;
