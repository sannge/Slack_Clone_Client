import { gql } from "@apollo/client";

export const NEW_CHANNEL_MESSAGE = gql`
	subscription newChannelMessage($channelId: Int!) {
		newChannelMessage(channelId: $channelId) {
			id
			text
			files
			user {
				username
			}
			createdAt
		}
	}
`;

export const NEW_DIRECT_MESSAGE = gql`
	subscription newDirectMessage($teamId: Int!, $userId: Int!) {
		newDirectMessage(teamId: $teamId, userId: $userId) {
			id
			text
			files
			sender {
				username
			}
			createdAt
		}
	}
`;

export const CREATE_DIRECT_MESSAGE = gql`
	mutation createDirectMessage(
		$receiverId: Int!
		$text: String
		$teamId: Int!
		$files: [Upload]
	) {
		createDirectMessage(
			receiverId: $receiverId
			text: $text
			teamId: $teamId
			files: $files
		)
	}
`;

export const DIRECT_MESSAGE_QUERY = gql`
	query directMessages($cursor: String, $teamId: Int!, $userId: Int!) {
		directMessages(cursor: $cursor, teamId: $teamId, otherUserId: $userId) {
			id
			text
			files
			sender {
				username
			}
			createdAt
		}
	}
`;

export const GET_MESSAGES = gql`
	query getMessages($cursor: String, $channelId: Int!) {
		getMessages(cursor: $cursor, channelId: $channelId) {
			id
			text
			files
			user {
				username
			}
			createdAt
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation($channelId: Int!, $text: String, $files: [Upload]) {
		createMessage(channelId: $channelId, text: $text, files: $files)
	}
`;
