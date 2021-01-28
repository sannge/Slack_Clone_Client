import React from "react";
import Messages from "../components/Messages";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

function MessageContainer({
	channelId,
	data: { loading, getMessages, error },
}) {
	if (loading) {
		return null;
	}
	if (error) {
		console.log(error);
	}
	return (
		<div>
			<Messages channelId={channelId}>
				{/* <ul className='message-list'>
					<li></li>
					<li></li>
				</ul> */}
				{JSON.stringify(getMessages)}
			</Messages>
		</div>
	);
}

const GET_MESSAGES = gql`
	query getMessages($channelId: Int!) {
		getMessages(channelId: $channelId) {
			id
			text
			user {
				username
			}
			createdAt
		}
	}
`;
export default graphql(GET_MESSAGES, {
	variables: (props) => ({
		channelId: props.channelId,
	}),
})(MessageContainer);
