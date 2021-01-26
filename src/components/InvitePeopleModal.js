import React from "react";
import { Form, Input, Modal, Button } from "semantic-ui-react";
import { Formik } from "formik";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { ALLTEAMSQUERY } from "../graphql/team";
import findIndex from "lodash/findIndex";

function InvitePeopleModal({ open, onCloseAddChannelClick, teamId, mutate }) {
	return (
		<Modal open={open} onClose={onCloseAddChannelClick}>
			<Modal.Header>Add Channel</Modal.Header>
			<Modal.Content>
				<Formik
					initialValues={{ name: "" }}
					onSubmit={async (values, { setSubmitting }) => {
						let response;
						try {
							response = await mutate({
								variables: { teamId: parseInt(teamId), name: values.name },
								update: (store, { data: { createChannel } }) => {
									const { ok, channel } = createChannel;
									if (!ok) {
										return;
									}
									console.log(ok);
									const dataCopy = {
										...store.readQuery({ query: ALLTEAMSQUERY }),
									};

									const teamIdx = dataCopy.allTeams.findIndex(
										(team) => team.id === parseInt(teamId)
									);

									const allTeamsCopy = [...dataCopy.allTeams];
									let teamCopy = { ...allTeamsCopy[teamIdx] };
									const channelsCopy = [...teamCopy.channels];
									channelsCopy.push(channel);

									teamCopy.channels = channelsCopy;
									allTeamsCopy[teamIdx] = teamCopy;
									dataCopy.allTeams = allTeamsCopy;

									store.writeQuery({
										query: ALLTEAMSQUERY,
										data: dataCopy,
									});
									// data.comments.push(submitComment);
									// store.writeQuery({ query: CommentAppQuery, data });
								},
							});
							if (response) {
								onCloseAddChannelClick();
							}
						} catch (err) {
							values.name = "";
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
								<Input
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									name='name'
									fluid
									placeholder='Type a Channel Name'
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
									onClick={onCloseAddChannelClick}
									color='red'
									fluid>
									Cancel
								</Button>
								<Button
									type='submit'
									onClick={handleSubmit}
									disabled={isSubmitting}
									fluid>
									Create Channel
								</Button>
							</Form.Field>
						</Form>
					)}
				</Formik>
			</Modal.Content>
		</Modal>
	);
}

const CREATE_CHANNEL = gql`
	mutation createChannel($teamId: Int!, $name: String!) {
		createChannel(teamId: $teamId, name: $name) {
			ok
			channel {
				id
				name
			}
		}
	}
`;

export default graphql(CREATE_CHANNEL)(InvitePeopleModal);
