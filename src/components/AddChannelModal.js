import React from "react";
import { Form, Input, Modal, Button, Checkbox } from "semantic-ui-react";
import { Formik } from "formik";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { ME_QUERY } from "../graphql/team";
import normalizeErrors from "../normalizeErrors";
import MultiSelectUsers from "./MultiSelectUsers";

function AddChannelModal({
	open,
	onCloseAddChannelClick,
	teamId,
	mutate,
	currentUserId,
}) {
	return (
		<Modal open={open} onClose={onCloseAddChannelClick}>
			<Modal.Header>Add Channel</Modal.Header>
			<Modal.Content>
				<Formik
					initialValues={{ members: [], public: true, name: "" }}
					onSubmit={async (values, { setSubmitting }) => {
						let response;
						if (values.name.trim() === "") {
							return;
						}
						try {
							response = await mutate({
								variables: {
									teamId: parseInt(teamId),
									name: values.name,
									public: values.public,
									members: values.members,
								},
								update: (store, { data: { createChannel } }) => {
									const { ok, channel } = createChannel;
									if (!ok) {
										return;
									}
									const dataCopy = {
										...store.readQuery({ query: ME_QUERY }),
									};

									console.log(dataCopy);

									const teamIdx = dataCopy.me.teams.findIndex(
										(team) => team.id === parseInt(teamId)
									);

									const meCopy = { ...dataCopy.me };
									const allTeamsCopy = [...meCopy.teams];
									let teamCopy = { ...allTeamsCopy[teamIdx] };
									const channelsCopy = [...teamCopy.channels];
									channelsCopy.push(channel);

									teamCopy.channels = channelsCopy;
									allTeamsCopy[teamIdx] = teamCopy;
									meCopy.teams = allTeamsCopy;
									dataCopy.me = meCopy;

									store.writeQuery({
										query: ME_QUERY,
										data: dataCopy,
									});
									// data.comments.push(submitComment);
									// store.writeQuery({ query: CommentAppQuery, data });
								},
							});
							if (response) {
								const {
									data: {
										createChannel: { ok },
									},
								} = response;
								if (!ok) {
									// errors.name = normalizeErrors(error)[0];
								} else {
									onCloseAddChannelClick();
								}
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
						setFieldValue,

						/* and other goodies */
					}) => (
						<Form>
							{console.log(errors.name)}

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
							<Form.Field>
								{" "}
								<Checkbox
									toggle
									checked={!values.public}
									label='Private Channel'
									onChange={(e, { checked }) => {
										setFieldValue("public", !checked);
										// setFieldValue("members", []);
									}}
								/>
							</Form.Field>
							<Form.Field>
								{!values.public && (
									<div>
										<MultiSelectUsers
											value={values.members}
											teamId={teamId}
											currentUserId={currentUserId}
											handleChange={(e, { value }) =>
												setFieldValue("members", value)
											}
											placeholder='Select members to invite'
										/>
									</div>
								)}
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
	mutation createChannel(
		$teamId: Int!
		$name: String!
		$public: Boolean
		$members: [Int!]
	) {
		createChannel(
			teamId: $teamId
			name: $name
			public: $public
			members: $members
		) {
			ok
			channel {
				id
				name
			}
		}
	}
`;

export default graphql(CREATE_CHANNEL)(AddChannelModal);
