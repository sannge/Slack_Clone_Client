import React from "react";
import { Form, Input, Modal, Button } from "semantic-ui-react";
import Downshift from "downshift";

import { useQuery } from "@apollo/client";

import { GET_TEAM_MEMBERS } from "../graphql/team";

import { withRouter } from "react-router-dom";

function DirectMessageModal({ open, onClose, teamId, history }) {
	const { data, loading, error } = useQuery(GET_TEAM_MEMBERS, {
		variables: {
			teamId: parseInt(teamId),
		},
	});

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header>Direct Message People in Your Team</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						{!loading && (
							<Downshift
								onChange={(selectedUser) => {
									history.push(`/view-team/user/${teamId}/${selectedUser.id}`);
									onClose();
								}}>
								{({
									getInputProps,
									getItemProps,
									isOpen,
									inputValue,
									selectedItem,
									highlightedIndex,
								}) => (
									<div>
										<Input
											{...getInputProps({ placeholder: "Favorite color? " })}
											fluid
										/>
										{isOpen ? (
											<div style={{ border: "1px solid #ccc" }}>
												{data?.getTeamMembers
													.filter(
														(item) =>
															!inputValue ||
															item.username
																.toLocaleLowerCase()
																.includes(inputValue.toLocaleLowerCase())
													)
													.map((item, index) => (
														<div
															{...getItemProps({ item: item })}
															key={item.id}
															style={{
																backgroundColor:
																	highlightedIndex === index
																		? "lightgray"
																		: "white",
																fontWeight:
																	selectedItem === item ? "bold" : "normal",
																padding: "7px",
															}}>
															{item.username}
														</div>
													))}
											</div>
										) : null}
									</div>
								)}
							</Downshift>
						)}
					</Form.Field>
					<Button fluid onClick={onClose}>
						Cancel
					</Button>
				</Form>
			</Modal.Content>
		</Modal>
	);
}

export default withRouter(DirectMessageModal);
