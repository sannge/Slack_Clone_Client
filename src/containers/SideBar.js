import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import decode from "jwt-decode";

import Teams from "../components/Teams";
import Channels from "../components/Channels";
import _ from "lodash";

const Sidebar = ({ data: { loading, allTeams, error }, currentTeam }) => {
	if (loading) {
		return null;
	}
	if (error) {
		console.log(error);
	}

	const teamIdx = _.findIndex(allTeams, ["id", currentTeam]);
	const team = allTeams[teamIdx];
	console.log(team);

	let username = "";

	try {
		const token = localStorage.getItem("token");
		const { user } = decode(token);
		username = user.username;
	} catch (err) {}

	return (
		<>
			<Teams
				teams={allTeams.map((t) => ({
					id: t.id,
					letter: t.name.charAt(0).toUpperCase(),
				}))}
			/>

			<Channels
				teamName={team?.name}
				username={username}
				channels={team?.channels}
			/>
		</>
	);
};

const ALLTEAMSQUERY = gql`
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

export default graphql(ALLTEAMSQUERY)(Sidebar);
