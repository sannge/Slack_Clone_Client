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

	componentWillReceiveProps({ teamId, userId, data: { directMessages } }) {
		if (this.props.teamId !== teamId || this.props.userId !== userId) {
			//if not unsubsribe, everytime,go to other and come back to this
			//channel, it will subscribe multiple times
			if (this.unsubscribe) {
				this.unsubscribe();
			}
			this.unsubscribe = this.subscribe(teamId, userId);
		}
		if (
			// this.scroller &&
			this.props.data.directMessages &&
			directMessages &&
			this.props.data.directMessages.length !== directMessages.length
		) {
			setTimeout(() => {
				if (this.scroller) {
					this.scroller.scrollTop = this.fetchMoreScroll;
				}
			}, 120);
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
				if (this.scrollRef) {
					this.scrollRef.scrollIntoView({
						behavior: "smooth",
						block: "end",
						inline: "nearest",
					});
				}

				this.fetchMoreScroll = null;
				return {
					...prev,
					directMessages: [
						...prev.directMessages,
						subscriptionData.data.newDirectMessage,
					],
				};
			},
		});

	handleScroll = () => {
		const {
			data: { directMessages, fetchMore, loading },
			teamId,
			userId,
		} = this.props;

		if (
			this.scroller &&
			!loading &&
			this.scroller.scrollHeight -
				Math.abs(this.scroller.scrollTop - window.innerHeight) <
				0 &&
			Math.abs(this.scroller.scrollTop - window.innerHeight) > -20 &&
			this.state.hasMoreItem &&
			directMessages.length >= 35
		) {
			this.fetchMoreScroll = this.scroller.scrollTop;
			fetchMore({
				variables: {
					cursor: directMessages[directMessages.length - 1].createdAt,
					teamId: parseInt(this.props.teamId),
					userId: parseInt(this.props.userId),
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
		}
	};

	render() {
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

						<Messages
							onScroll={this.handleScroll}
							ref={(scroller) => {
								this.scroller = scroller;
							}}
							height={this.props.height}>
							<Comment.Group>
								{directMessages
									?.slice()
									.reverse()
									.map((m) => (
										<div key={`direct-message-${m.id}`}>
											<Comment>
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
																	flexWrap: "wrap",
																	width: "100%",
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
																				boxShadow: "0 0 1px #ccc",
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
										</div>
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
		notifyOnNetworkStatusChange: true,
	}),
})(DirectMessageContainer);
