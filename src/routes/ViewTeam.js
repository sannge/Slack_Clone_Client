import React from "react";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/SideBar";

import { graphql } from "@apollo/client/react/hoc";

import { ALLTEAMSQUERY } from "../graphql/team";

import findIndex from "lodash/findIndex";

function ViewTeam({
	data: { loading, allTeams },
	history,
	match: {
		params: { teamId, channelId },
	},
}) {
	if (loading) {
		return null;
	}

	let teamIdx = teamId
		? findIndex(allTeams, ["id", parseInt(teamId, 10)])
		: history.push(`/view-team/${allTeams[0].id}`);
	// if (teamIdx === 0) {
	// 	history.push(`/view-team/${allTeams[0].id}`);
	// }
	if (!teamIdx) teamIdx = 0;

	if (teamIdx === -1) {
		teamIdx = 0;
		history.push(`/view-team/${allTeams[0].id}`);
	}
	const team = allTeams[teamIdx];

	const channelIdx = channelId
		? findIndex(team.channels, ["id", parseInt(channelId, 10)])
		: 0;
	const channel = team.channels[channelIdx];

	return (
		<AppLayout>
			<Sidebar
				teams={allTeams.map((t) => ({
					id: t.id,
					letter: t.name.charAt(0).toUpperCase(),
				}))}
				allTeams={allTeams}
				team={team}
				currentTeamId={teamId}
			/>
			<Header channelName={channel.name} />
			<Messages channelId={channel.id}>
				<ul className='message-list'>
					<li></li>
					<li></li>
				</ul>
			</Messages>
			<SendMessage channelName={channel.name} />
		</AppLayout>
	);
}

export default graphql(ALLTEAMSQUERY)(ViewTeam);
