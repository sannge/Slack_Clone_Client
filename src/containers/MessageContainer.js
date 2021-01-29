import React from "react";
import Messages from "../components/Messages";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import { Comment } from "semantic-ui-react";
import { NEW_CHANNEL_MESSAGE } from "../graphql/message";

import moment from "moment";

class MessageContainer extends React.Component {
	componentWillMount() {
		this.unsubscribe = this.subscribe(this.props.channelId);
	}

	componentWillUnmount() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	componentWillReceiveProps(newProps) {
		const { channelId } = newProps;
		if (this.props.channelId !== channelId) {
			console.log("props: ", channelId);
			//if not unsubsribe, everytime,go to other and come back to this
			//channel, it will subscribe multiple times
			if (this.unsubscribe) {
				this.unsubscribe();
			}
			this.unsubscribe = this.subscribe(channelId);
		}
	}

	subscribe = (channelId) =>
		this.props.data.subscribeToMore({
			document: NEW_CHANNEL_MESSAGE,
			variables: { channelId },
			updateQuery: (prev, { subscriptionData }) => {
				console.log(subscriptionData);
				if (!subscriptionData) {
					return prev;
				}
				return {
					...prev,
					getMessages: [
						...prev.getMessages,
						subscriptionData.data.newChannelMessage,
					],
				};
			},
		});

	render() {
		const {
			channelId,
			data: { loading, getMessages },
		} = this.props;
		return (
			<div>
				{loading ? (
					<div>Loading...</div>
				) : (
					<Messages channelId={channelId}>
						<Comment.Group>
							{getMessages.map((m) => (
								<Comment key={`message-${m.id}`}>
									<Comment.Content>
										<Comment.Author as='a'>{m.user.username}</Comment.Author>
										<Comment.Metadata>
											<div>
												{moment(m.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
											</div>
										</Comment.Metadata>
										<Comment.Text>{m.text}</Comment.Text>
										<Comment.Actions>
											<Comment.Action>Reply</Comment.Action>
										</Comment.Actions>
									</Comment.Content>
								</Comment>
							))}
						</Comment.Group>
					</Messages>
				)}
			</div>
		);
	}
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
	options: {
		fetchPolicy: "network-only",
	},
})(MessageContainer);
