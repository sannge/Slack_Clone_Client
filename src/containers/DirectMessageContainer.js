import React from "react";
import Messages from "../components/Messages";

import { graphql } from "@apollo/client/react/hoc";

import { Button, Comment, Progress } from "semantic-ui-react";
import { NEW_DIRECT_MESSAGE, DIRECT_MESSAGE_QUERY } from "../graphql/message";

import moment from "moment";
import Loading from "../components/Loading";
import FileUpload from "../components/FileUpload";

class DirectMessageContainer extends React.Component {
	state = {
		hasMoreItem: true,
	};
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
		console.log(this.props.height);
		const {
			teamId,
			userId,
			data: { loading, directMessages, error },
			createDirectMessageLoading,
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
					<div style={{ position: "relative", width: "100%" }}>
						<div
							style={{
								position: "absolute",
								marginTop: "20px",
								width: "100%",
							}}>
							{createDirectMessageLoading && this.props.height === 70 && (
								<div
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Progress
										style={{
											width: "40%",
											zIndex: "100",
											position: "relative",
										}}
										size='medium'
										color='green'
										percent={100}
										indicating>
										<div
											style={{
												position: "absolute",
												top: "-26px",
												color: "white",
												display: "flex",
												justifyContent: "center",
												width: "100%",
											}}>
											Loading...
										</div>
									</Progress>
								</div>
							)}
						</div>
						<Messages height={this.props.height}>
							<Comment.Group>
								{this.state.hasMoreItem && directMessages.length >= 35 && (
									<Button
										onClick={() => {
											this.props.data.fetchMore({
												variables: {
													cursor:
														directMessages[directMessages.length - 1].createdAt,
													channelId: this.props.channelId,
												},
												updateQuery: (previousResult, { fetchMoreResult }) => {
													if (!fetchMoreResult) {
														return previousResult;
													}
													if (fetchMoreResult.directMessages.length < 35) {
														this.setState({ hasMoreItem: false });
													}
													return {
														...previousResult,
														directMessages: [
															...previousResult.directMessages,
															...fetchMoreResult.directMessages,
														],
													};
												},
											});
										}}>
										Load More
									</Button>
								)}
								{directMessages
									?.slice()
									.reverse()
									.map((m) => (
										<Comment key={`direct-message-${m.id}`}>
											<Comment.Content>
												<Comment.Author as='a'>
													{m.sender?.username}
												</Comment.Author>
												<Comment.Metadata>
													<div>
														{moment(new Date(parseInt(m.createdAt))).format(
															"MMMM Do YYYY, h:mm:ss a"
														)}
													</div>
												</Comment.Metadata>
												<Comment.Text>
													<>
														<div
															style={{
																marginTop: "10px",
																display: "flex",
																alignItems: "center",
															}}>
															{m.files &&
																m.files.map((file, index) => (
																	<div
																		key={index}
																		style={{
																			marginRight: "20px",
																			marginTop: "20px",
																			cursor: "pointer",
																		}}>
																		<a href={file} target='_blank'>
																			<img
																				style={{ height: "150px" }}
																				src={file}
																				alt='image'
																			/>
																		</a>
																	</div>
																))}
														</div>
														{m.text}
													</>
												</Comment.Text>
												<Comment.Actions>
													<Comment.Action>Reply</Comment.Action>
												</Comment.Actions>
											</Comment.Content>
										</Comment>
									))}
							</Comment.Group>
						</Messages>
					</div>
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
