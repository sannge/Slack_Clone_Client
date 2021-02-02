import React from "react";
import Messages from "../components/Messages";

import { graphql } from "@apollo/client/react/hoc";

import { Comment } from "semantic-ui-react";
import { NEW_DIRECT_MESSAGE, DIRECT_MESSAGE_QUERY } from "../graphql/message";

import moment from "moment";
import Loading from "../components/Loading";

class DirectMessageContainer extends React.Component {
	componentWillMount() {
		this.unsubscribe = this.subscribe(this.props.teamId, this.props.userId);
	}

	componentWillUnmount() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	componentWillReceiveProps({ teamId, userId }) {
		if (this.props.teamId !== teamId || this.props.userId !== userId) {
			//if not unsubsribe, everytime,go to other and come back to this
			//channel, it will subscribe multiple times
			if (this.unsubscribe) {
				this.unsubscribe();
			}
			this.unsubscribe = this.subscribe(teamId, userId);
		}
	}

	subscribe = (teamId, userId) =>
		this.props.data.subscribeToMore({
			document: NEW_DIRECT_MESSAGE,
			variables: { teamId: parseInt(teamId), userId: parseInt(userId) },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData) {
					return prev;
				}
				return {
					...prev,
					directMessages: [
						...prev.directMessages,
						subscriptionData.data.newDirectMessage,
					],
				};
			},
		});

	render() {
		const {
			teamId,
			userId,
			data: { loading, directMessages, error },
		} = this.props;
		if (loading) {
			return null;
		}

		if (error) {
			console.log(error);
		}
		console.log(directMessages);
		return (
			<div>
				{loading ? (
					<div
						style={{
							width: "100%",
							height: "80vh",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Loading size={30} />
					</div>
				) : (
					<Messages>
						<Comment.Group>
							{directMessages?.map((m) => (
								<Comment key={`direct-message-${m.id}`}>
									<Comment.Content>
										<Comment.Author as='a'>{m.sender?.username}</Comment.Author>
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

export default graphql(DIRECT_MESSAGE_QUERY, {
	options: (props) => ({
		variables: {
			teamId: parseInt(props.teamId),
			userId: parseInt(props.userId),
		},
		fetchPolicy: "network-only",
	}),
})(DirectMessageContainer);
