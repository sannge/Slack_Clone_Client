import React from "react";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/SideBar";
import DirectMessageContainer from "../containers/DirectMessageContainer";

import { graphql } from "@apollo/client/react/hoc";

import { ME_QUERY } from "../graphql/team";

import { useMutation, gql } from "@apollo/client";

import findIndex from "lodash/findIndex";
import { CREATE_DIRECT_MESSAGE } from "../graphql/message";

function DirectMessages({
	data: { loading, me, getUser, error },
	history,
	match: {
		params: { teamId, userId },
	},
}) {
	const [createDirectMessage] = useMutation(CREATE_DIRECT_MESSAGE, {
		update: (store) => {
			const dataCopy = {
				...store.readQuery({ query: ME_QUERY }),
			};
			const data = store.readQuery({ query: ME_QUERY });

			console.log("DATA::: ", data);

			const teamIdx = dataCopy.me.teams.findIndex(
				(team) => team.id === parseInt(teamId)
			);

			const meCopy = { ...dataCopy.me };
			const allTeamsCopy = [...meCopy.teams];
			const teamIdx2 = findIndex(allTeamsCopy, ["id", team.id]);
			let teamCopy = { ...allTeamsCopy[teamIdx2] };
			const directMessageMembersCopy = [...teamCopy.directMessageMembers];

			const notAlreadyThere = directMessageMembersCopy.every(
				(member) => member.id !== parseInt(userId, 10)
			);
			if (notAlreadyThere) {
				directMessageMembersCopy.push({
					__typename: "User",
					id: userId,
					username: getUser.username,
				});

				teamCopy.directMessageMembers = directMessageMembersCopy;
				allTeamsCopy[teamIdx2] = teamCopy;
				meCopy.teams = allTeamsCopy;
				dataCopy.me = meCopy;
				console.log(dataCopy);
				store.writeQuery({ query: ME_QUERY, data: dataCopy });
			}
		},
	});

	if (loading) {
		return null;
	}
	if (error) {
		console.log(error);
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

	let userIdExists = false;
	team?.directMessageMembers.forEach((m) => {
		if (m.id === userId) {
			userIdExists = true;
			return;
		}
	});

	if (!parseInt(userId) || userIdExists) {
		// if (teamMemberCount === 0) {

		// } else {
		// 	history.push(
		// 		`/view-team/user/${team?.id}/${team?.directMessageMembers[0].id}`
		// 	);
		// }
		history.push(`/view-team/user/${team?.id}`);
	}

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
			<Header channelName={getUser.username} />
			<DirectMessageContainer teamId={teamId} userId={userId} />
			<SendMessage
				onSubmit={async (text) => {
					await createDirectMessage({
						variables: {
							teamId: parseInt(teamId),
							text,
							receiverId: parseInt(userId),
						},
					});
				}}
				placeholder={userId}
			/>
		</AppLayout>
	);
}

const directMessageMeQuery = gql`
	query($userId: Int!) {
		getUser(userId: $userId) {
			username
		}

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

export default graphql(directMessageMeQuery, {
	options: (props) => ({
		variables: { userId: parseInt(props.match.params.userId, 10) },
		fetchPolicy: "network-only",
	}),
})(DirectMessages);
