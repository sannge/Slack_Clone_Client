import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import decode from "jwt-decode";

import Teams from "../components/Teams";
import Channels from "../components/Channels";
import findIndex from "lodash/findIndex";
import AddChannelModal from "../components/AddChannelModal";

import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ALLTEAMSQUERY } from "../graphql/team";

class Sidebar extends React.Component {
	state = {
		openAddChannelModal: false,
	};

	handleAddChannelClick = () => {
		this.setState({ openAddChannelModal: true });
	};

	handleCloseAddChannelModal = () => {
		this.setState({ openAddChannelModal: false });
	};

	render() {
		const {
			history,
			data: { loading, allTeams, error },
			currentTeamId,
		} = this.props;

		// console.log("ALL TEAMs: ", allTeams, loading);
		// if (allTeams.length === 0) {
		// 	return <Redirect to='/create-team' />;
		// }

		if (loading) {
			return null;
		}
		if (error) {
			console.log(error);
			return null;
		}
		let team;
		let username = "";
		console.log(currentTeamId);

		let teamIdx = currentTeamId
			? findIndex(allTeams, ["id", parseInt(currentTeamId, 10)])
			: history.push(`/view-team/${allTeams[0].id}`);
		if (teamIdx === -1) {
			history.push(`/view-team/${allTeams[0].id}`);
		}
		team = allTeams[teamIdx];
		console.log(teamIdx);
		console.log(allTeams);

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
					onAddChannelClick={this.handleAddChannelClick}
				/>

				<AddChannelModal
					teamId={currentTeamId}
					open={this.state.openAddChannelModal}
					onCloseAddChannelClick={this.handleCloseAddChannelModal}
				/>
			</>
		);
	}
}

export default graphql(ALLTEAMSQUERY)(withRouter(Sidebar));
