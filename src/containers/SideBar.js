import React from "react";
import Teams from "../components/Teams";
import Channels from "../components/Channels";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";
import DirectMessageModal from "../components/DirectMessageModal";

class Sidebar extends React.Component {
	state = {
		openAddChannelModal: false,
		openInvitePeopleModal: false,
		openDirectMessageModal: false,
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
	handleOpenDirectMessageModal = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ openDirectMessageModal: true });
	};

	handleCloseDirectMessageModal = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ openDirectMessageModal: false });
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
		const { teams, currentTeamId, team, username } = this.props;

		// console.log("ALL TEAMs: ", allTeams, loading);
		// if (allTeams.length === 0) {
		// 	return <Redirect to='/create-team' />;
		// }
		return (
			<>
				<Teams teams={teams} />

				<Channels
					teamName={team?.name}
					username={username}
					teamId={team?.id}
					isOwner={team?.admin}
					channels={team?.channels}
					users={team?.directMessageMembers}
					onAddChannelClick={this.handleAddChannelClick}
					onInvitePeople={this.onInvitePeople}
					onDirectMessageClick={this.handleOpenDirectMessageModal}
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

				<DirectMessageModal
					open={this.state.openDirectMessageModal}
					onClose={this.handleCloseDirectMessageModal}
					teamId={currentTeamId}
				/>
			</>
		);
	}
}

export default Sidebar;
