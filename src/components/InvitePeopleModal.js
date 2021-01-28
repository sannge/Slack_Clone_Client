import React from "react";
import { Form, Input, Modal, Button } from "semantic-ui-react";
import { Formik } from "formik";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import normalizeErrors from "../normalizeErrors";

function InvitePeopleModal({ open, onClose, teamId, mutate }) {
	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header>Invite People to your team</Modal.Header>
			<Modal.Content>
				<Formik
					initialValues={{ email: "" }}
					onSubmit={async (values, { setSubmitting, setErrors }) => {
						let response;
						try {
							response = await mutate({
								variables: { teamId: parseInt(teamId), email: values.email },
							});
							console.log(response);
							const { ok, errors } = response.data.addTeamMember;
							if (ok) {
								onClose();
								setSubmitting(false);
							} else {
								setSubmitting(false);
								setErrors(normalizeErrors(errors));
							}
						} catch (err) {
							console.log(err);
						}
						setSubmitting(false);
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
					}) => (
						<Form>
							<Form.Field>
								{touched.email && errors.email ? (
									<div
										style={{
											marginBottom: "13px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											color: "red",
										}}>
										{errors.email[0]}
									</div>
								) : null}
								<Input
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									name='email'
									fluid
									placeholder="User's email"
								/>
							</Form.Field>
							<Form.Field
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Button
									disabled={isSubmitting}
									onClick={onClose}
									color='red'
									fluid>
									Cancel
								</Button>
								<Button
									type='submit'
									onClick={handleSubmit}
									disabled={isSubmitting}
									fluid>
									Invite
								</Button>
							</Form.Field>
						</Form>
					)}
				</Formik>
			</Modal.Content>
		</Modal>
	);
}

const ADD_TEAM_MEMBER = gql`
	mutation addTeamMember($email: String!, $teamId: Int!) {
		addTeamMember(email: $email, teamId: $teamId) {
			ok
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(ADD_TEAM_MEMBER)(InvitePeopleModal);
