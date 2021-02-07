import React from "react";
import Messages from "../components/Messages";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import { Button, Comment, Image, Progress } from "semantic-ui-react";
import { NEW_CHANNEL_MESSAGE, GET_MESSAGES } from "../graphql/message";

import moment from "moment";
import Loading from "../components/Loading";

import FileUpload from "../components/FileUpload";

class MessageContainer extends React.Component {
	state = {
		hasMoreItem: true,
	};
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
				console.log(prev);
				console.log(subscriptionData);
				if (!subscriptionData) {
					return prev;
				}
				return {
					...prev,
					getMessages: [
						subscriptionData.data.newChannelMessage,
						...prev.getMessages,
					],
				};
			},
		});

	handleScroll = () => {
		if (this.scroller) {
			console.log(this.scroller.scrollTop);
		}
	};

	render() {
		const {
			channelId,
			data: { loading, getMessages },
			createMessageLoading,
		} = this.props;
		if (getMessages) {
			console.log(getMessages);
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
						{/* loading sign for pics here */}
						<div
							style={{
								position: "absolute",
								marginTop: "20px",
								width: "100%",
							}}>
							{createMessageLoading && this.props.height === 70 && (
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
							height={this.props.height}
							channelId={channelId}>
							<div>
								<Comment.Group>
									{this.state.hasMoreItem && getMessages.length >= 35 && (
										<Button
											onClick={() => {
												this.props.data.fetchMore({
													variables: {
														cursor:
															getMessages[getMessages.length - 1].createdAt,
														channelId: this.props.channelId,
													},
													updateQuery: (
														previousResult,
														{ fetchMoreResult }
													) => {
														if (!fetchMoreResult) {
															return previousResult;
														}
														if (fetchMoreResult.getMessages.length < 35) {
															this.setState({ hasMoreItem: false });
														}
														return {
															...previousResult,
															getMessages: [
																...previousResult.getMessages,
																...fetchMoreResult.getMessages,
															],
														};
													},
												});
											}}>
											Load More
										</Button>
									)}
									{getMessages
										.slice()
										.reverse()
										.map((m) => (
											<Comment key={`message-${m.id}`}>
												<Comment.Content>
													<Comment.Author as='a'>
														{m.user.username}
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
																	width: "180%",
																	marginTop: "10px",
																	display: "flex",
																	flexWrap: "wrap",
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
																			<a target='_blank' href={file}>
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
							</div>
						</Messages>
					</div>
				)}
			</div>
		);
	}
}

export default graphql(GET_MESSAGES, {
	options: (props) => ({
		fetchPolicy: "network-only",
		variables: {
			offset: 0,
			channelId: props.channelId,
		},
	}),
})(MessageContainer);
