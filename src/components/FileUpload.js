import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Wrapper = styled.div`
	input:focus,
	button:focus {
		outline: none;
	}
`;

function FileUpload({ children, onDrop }) {
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept:
			"image/jpeg, image/png, image/jpg, video/quicktime, video/mp4, video/m4p, video/m4v, video/avi, video/wmv, video/mov, video/flv,video/swf",
	});
	return (
		<Wrapper>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{children}
			</div>
		</Wrapper>
	);
}

export default FileUpload;
