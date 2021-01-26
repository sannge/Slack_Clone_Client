import { gql } from "@apollo/client";

export const ALLTEAMSQUERY = gql`
	query allTeams {
		allTeams {
			id
			name
			channels {
				id
				name
			}
		}
	}
`;
