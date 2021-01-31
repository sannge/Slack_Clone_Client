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

export const SEND_MESSAGE = gql`
	mutation($channelId: Int!, $text: String!) {
		createMessage(channelId: $channelId, text: $text)
	}
`;
