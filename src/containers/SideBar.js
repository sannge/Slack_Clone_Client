import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import decode from "jwt-decode";

import Teams from "../components/Teams";
import Channels from "../components/Channels";
import findIndex from "lodash/findIndex";
import { withRouter } from "react-router-dom";

const Sidebar = ({
	history,
	data: { loading, allTeams, error },
	currentTeamId,
}) => {
	if (loading) {
		return null;
	}
	if (error) {
		console.log(error);
	}
	console.log(currentTeamId);
	let teamIdx = currentTeamId
		? findIndex(allTeams, ["id", parseInt(currentTeamId, 10)])
		: history.push(`/view-team/${allTeams[0].id}`);
	if (teamIdx === -1) {
		history.push(`/view-team/${allTeams[0].id}`);
	}
	const team = allTeams[teamIdx];
	console.log(teamIdx);
	console.log(allTeams);

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

export default graphql(ALLTEAMSQUERY)(withRouter(Sidebar));
