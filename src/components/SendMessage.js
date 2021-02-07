import styled from "styled-components";
import { Icon, TextArea, Form } from "semantic-ui-react";
import React, { useEffect, useState } from "react";

import { withRouter } from "react-router-dom";

import { Formik } from "formik";

import decode from "jwt-decode";

import FileUpload from "./FileUpload";
import Files from "./Files";

const SendMessageWrapper = styled.div`
	grid-column: 3;
	grid-row: 3;
	margin: 20px;
	display: flex;
	flex-direction: column;
	width: 90%;
`;

const ImageDiv = styled.div`
	&::-webkit-scrollbar {
		display: none;
	}
	width: 100%;
	height: 80px;
	background: white;
	padding: 15px;
	overflow-x: auto;
	overflow-y: hidden;
	padding-left: 15px;
	padding-right: 15px;
	display: flex;
	align-items: center;
	border: 1px solid #ccc;
	border-bottom: none;
`;

const ENTER_KEY = 13;

const SendMessage = ({
	onSubmit,
	onDrop,
	files,
	match,
	setFiles,
	placeholder,
	createMessageLoading,
}) => {
	const urlPrams = match.params;

	const { teamId, userId, channelId } = urlPrams;

	const [empty, setEmpty] = useState(false);

	useEffect(() => {
		setFiles([]);
		setEmpty(true);
	}, [teamId, userId, channelId]);
	return (
		<SendMessageWrapper>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "100%",
				}}>
				{files?.length > 0 && (
					<ImageDiv>
						<Files
							createMessageLoading={createMessageLoading}
							setFiles={setFiles}
							files={files}
						/>
					</ImageDiv>
				)}
			</div>
			<div>
				<Formik
					initialValues={{ message: "" }}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						if (!values.message || !values.message.trim()) {
							if (files.length === 0) {
								setSubmitting(false);
								return;
							}
						}
						try {
							if (values.message.trim() !== "") {
								await onSubmit(values.message);
							} else {
								console.log("empty message");
								await onSubmit();
							}
							// await mutate({
							// 	variables: { channelId, text: values.message },
							// });
							resetForm();
						} catch (err) {}
					}}>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						resetForm,
						/* and other goodies */
					}) => {
						return (
							<Form>
								<TextArea
									style={{
										borderTop: `${
											files.length > 0 ? "none" : ".3px solid #eee"
										}`,
									}}
									onKeyDown={(e) => {
										if (e.keyCode === ENTER_KEY && !isSubmitting) {
											handleSubmit(e);
										}
									}}
									name='message'
									onBlur={handleBlur}
									onChange={handleChange}
									disabled={createMessageLoading}
									value={values.message}
									fluid
									placeholder={`Message #${placeholder}`}></TextArea>
							</Form>
						);
					}}
				</Formik>
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					background: "#eee",
					justifyContent: "flex-end",
				}}>
				<FileUpload onDrop={onDrop}>
					<div className='ui icon buttons' style={{ marginRight: "1px" }}>
						<button className='ui button'>
							<Icon style={{ color: "#634343" }} name='plus square outline' />
						</button>
					</div>
				</FileUpload>
				<div className='ui icon buttons'>
					<button className='ui button'>
						<Icon name='smile outline' style={{ color: "#634343" }} />
					</button>
				</div>
			</div>
		</SendMessageWrapper>
	);
};
export default withRouter(SendMessage);
