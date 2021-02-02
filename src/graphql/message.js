import { gql } from "@apollo/client";

export const NEW_CHANNEL_MESSAGE = gql`
	subscription newChannelMessage($channelId: Int!) {
		newChannelMessage(channelId: $channelId) {
			id
			text
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
		$text: String!
		$teamId: Int!
	) {
		createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
	}
`;

export const DIRECT_MESSAGE_QUERY = gql`
	query directMessages($teamId: Int!, $userId: Int!) {
		directMessages(teamId: $teamId, otherUserId: $userId) {
			id
			text
			sender {
				username
			}
			createdAt
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation($channelId: Int!, $text: String!) {
		createMessage(channelId: $channelId, text: $text)
	}
`;
