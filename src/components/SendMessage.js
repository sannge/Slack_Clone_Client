import styled from "styled-components";
import { Input, Form } from "semantic-ui-react";
import React from "react";

import { Formik } from "formik";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

const SendMessageWrapper = styled.div`
	grid-column: 3;
	grid-row: 3;
	margin: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({ channelName, mutate, channelId }) => (
	<SendMessageWrapper>
		<Formik
			initialValues={{ message: "" }}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				if (!values.message || !values.message.trim()) {
					setSubmitting(false);
					return;
				}
				try {
					await mutate({
						variables: { channelId, text: values.message },
					});
					resetForm();
				} catch (err) {
					console.log(err);
				}
			}}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				/* and other goodies */
			}) => {
				return (
					<Form>
						<Input
							onKeyDown={(e) => {
								if (e.keyCode === ENTER_KEY && !isSubmitting) {
									handleSubmit(e);
								}
							}}
							name='message'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.message}
							fluid
							placeholder={`Message #${channelName}`}
						/>
					</Form>
				);
			}}
		</Formik>
	</SendMessageWrapper>
);
const SEND_MESSAGE = gql`
	mutation($channelId: Int!, $text: String!) {
		createMessage(channelId: $channelId, text: $text)
	}
`;

export default graphql(SEND_MESSAGE)(SendMessage);
