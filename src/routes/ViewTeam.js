import React from "react";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/SideBar";
import MessageContainer from "../containers/MessageContainer";

import { graphql } from "@apollo/client/react/hoc";

import { ME_QUERY } from "../graphql/team";

import findIndex from "lodash/findIndex";

function ViewTeam({
	data: { loading, me },
	history,
	match: {
		params: { teamId, channelId },
	},
}) {
	if (loading) {
		return null;
	}

	const { teams: allTeams, username } = me;

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

	let channelIdx = channelId
		? findIndex(team.channels, ["id", parseInt(channelId, 10)])
		: 0;
	if (channelIdx === -1) {
		channelIdx = 0;
		history.push(
			`/view-team/${allTeams[0].id}/${team.channels[channelIdx].id}`
		);
	}
	const channel = team.channels[channelIdx];

	return (
		<AppLayout>
			<Sidebar
				teams={allTeams.map((t) => ({
					id: t.id,
					admin: t.admin,
					letter: t.name.charAt(0).toUpperCase(),
				}))}
				allTeams={allTeams}
				team={team}
				currentTeamId={teamId}
				username={username}
			/>
			{channel && <Header channelName={channel.name} />}
			{channel && (
				<>
					<MessageContainer channelId={channel.id} />
				</>
			)}
			{channel && (
				<SendMessage channelName={channel.name} channelId={channel.id} />
			)}
		</AppLayout>
	);
}

export default graphql(ME_QUERY)(ViewTeam);
