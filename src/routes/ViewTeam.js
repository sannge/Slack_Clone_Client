import React, { useState, useEffect } from "react";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/SideBar";
import MessageContainer from "../containers/MessageContainer";

import { graphql } from "@apollo/client/react/hoc";

import { useMutation } from "@apollo/client";

import { ME_QUERY } from "../graphql/team";

import findIndex from "lodash/findIndex";
import { SEND_MESSAGE } from "../graphql/message";

function ViewTeam({
	data: { loading, me, error },
	history,
	match: {
		params: { teamId, channelId },
	},
}) {
	const [files, setFiles] = useState([]);
	console.log(history.location);

	const onDrop = (arr) => {
		if (files.length > 0) {
			const copyFiles = [...files];
			setFiles(copyFiles.concat(arr));
		} else {
			console.log(arr[0].name);
			setFiles(arr);
		}
	};
	const [createMessage, { loading: createMessageLoading }] = useMutation(
		SEND_MESSAGE
	);

	useEffect(() => {
		if (teamId === "just-logged-in") {
			window.location.href =
				window.location.href.split("/view-team")[0] + "/view-team";
			return;
		}
	}, [teamId]);

	if (loading) {
		return null;
	}
	if (error) {
		console.log(error);
	}

	const { id: currentUserId, teams: allTeams, username } = me;

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
				currentUserId={currentUserId}
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
					<MessageContainer
						createMessageLoading={createMessageLoading}
						channelId={channel.id}
						height={files.length > 0 ? 70 : 80}
					/>
				</>
			)}
			{channel && (
				<SendMessage
					placeholder={channel.name}
					onDrop={onDrop}
					files={files}
					setFiles={setFiles}
					createMessageLoading={createMessageLoading}
					onSubmit={async (text) => {
						await createMessage({
							variables: { text, channelId: channel.id, files: files },
						});
						setFiles([]);
					}}
				/>
			)}
		</AppLayout>
	);
}

export default graphql(ME_QUERY, { options: { fetchPolicy: "network-only" } })(
	ViewTeam
);
