import React from "react";
import decode from "jwt-decode";

import Teams from "../components/Teams";
import Channels from "../components/Channels";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";

class Sidebar extends React.Component {
	state = {
		openAddChannelModal: false,
		openInvitePeopleModal: false,
	};

	handleAddChannelClick = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ openAddChannelModal: true });
	};

	handleCloseAddChannelModal = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ openAddChannelModal: false });
	};

	onInvitePeople = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ openInvitePeopleModal: true });
	};

	onInvitePeopleClose = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ openInvitePeopleModal: false });
	};

	render() {
		const { teams, currentTeamId, team } = this.props;

		// console.log("ALL TEAMs: ", allTeams, loading);
		// if (allTeams.length === 0) {
		// 	return <Redirect to='/create-team' />;
		// }

		let username = "";
		let isOwner = false;

		try {
			const token = localStorage.getItem("token");
			const { user } = decode(token);
			isOwner = user.id === team?.owner;
			username = user.username;
		} catch (err) {}

		return (
			<>
				<Teams teams={teams} />

				<Channels
					teamName={team?.name}
					username={username}
					teamId={team?.id}
					isOwner={isOwner}
					channels={team?.channels}
					onAddChannelClick={this.handleAddChannelClick}
					onInvitePeople={this.onInvitePeople}
				/>

				<AddChannelModal
					teamId={currentTeamId}
					open={this.state.openAddChannelModal}
					onCloseAddChannelClick={this.handleCloseAddChannelModal}
				/>

				<InvitePeopleModal
					teamId={currentTeamId}
					open={this.state.openInvitePeopleModal}
					onClose={this.onInvitePeopleClose}
				/>
			</>
		);
	}
}

export default Sidebar;
