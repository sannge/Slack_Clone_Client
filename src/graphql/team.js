import { gql } from "@apollo/client";

export const ME_QUERY = gql`
	query me {
		me {
			id
			username
			teams {
				id
				name
				admin
				directMessageMembers {
					id
					username
				}
				channels {
					id
					name
				}
			}
		}
	}
`;

export const GET_TEAM_MEMBERS = gql`
	query getTeamMembers($teamId: Int!) {
		getTeamMembers(teamId: $teamId) {
			username
			id
		}
	}
`;
