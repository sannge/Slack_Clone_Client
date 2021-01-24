import React from "react";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/SideBar";

function ViewTeam({ match: { params } }) {
	return (
		<AppLayout>
			<Sidebar currentTeamId={params.teamId} />
			<Header channelName='general' />
			<Messages>
				<ul className='message-list'>
					<li></li>
					<li></li>
				</ul>
			</Messages>
			<SendMessage channelName='general' />
		</AppLayout>
	);
}

export default ViewTeam;
