import styled from "styled-components";
import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import { withRouter } from "react-router-dom";

const ChannelWrapper = styled.div`
	grid-column: 2;
	grid-row: 1 / 4;
	background: #4e3a4c;
	color: #958993;
	& .link {
		color: #958993;
	}
`;

const TeamNameHeader = styled.h1`
	color: #fff;
	font-size: 20px;
`;

const SideBarList = styled.ul`
	width: 100%;
	list-style: none;
	padding-left: 0px;
	& .activeLink .sidebarlistitem {
		background: #3e313c;
	}
`;

const paddingLeft = `padding-left: 10px`;

const SideBarListItem = styled.li`
	margin-left: 5px;
	padding: 5px;
	color: #999;
	${paddingLeft};
	cursor: pointer;
	&:hover {
		background: #3e313c;
	}
`;

const SideBarListHeader = styled.li`
	${paddingLeft}
`;

const PushRight = styled.div`
	${paddingLeft}
`;

const Green = styled.span`
	color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = ({ id, name }, teamId, location) => (
	<NavLink
		activeClassName='activeLink'
		isActive={() =>
			location.pathname.search(`view-team/${teamId}/${id}`) !== -1
		}
		className='link'
		key={`channel-${id}`}
		to={`/view-team/${teamId}/${id}`}>
		<SideBarListItem className='sidebarlistitem'># {name}</SideBarListItem>
	</NavLink>
);

const user = ({ id, username }, teamId, loggedInUserName) => (
	<div key={`direct-message-${id}`}>
		{loggedInUserName !== username && (
			<NavLink
				activeClassName='activeLink'
				to={`/view-team/user/${teamId}/${id}`}>
				<SideBarListItem className='sidebarlistitem' key={`user-${id}`}>
					<Bubble /> {username}
				</SideBarListItem>
			</NavLink>
		)}
	</div>
);

const Channels = ({
	teamName,
	username,
	channels,
	users,
	onAddChannelClick,
	onDirectMessageClick,
	teamId,
	onInvitePeople,
	isOwner,
	location,
}) => (
	<ChannelWrapper>
		<PushRight>
			<TeamNameHeader>{teamName}</TeamNameHeader>
			{username}
		</PushRight>
		<div>
			<SideBarList>
				<SideBarListHeader
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "5px",
					}}>
					Channel{" "}
					{isOwner && (
						<Icon
							onClick={onAddChannelClick}
							className='addChannelIcon'
							style={{
								fontSize: "1.3rem",
								paddingLeft: "5px",
								marginRight: "15px",
								cursor: "pointer",
							}}
							name='plus circle'
						/>
					)}
				</SideBarListHeader>
				{channels?.length > 0 &&
					channels.map((c) => channel(c, teamId, location))}
			</SideBarList>
		</div>

		<div>
			<SideBarList>
				<SideBarListHeader
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "5px",
					}}>
					Direct Messages{" "}
					<Icon
						onClick={onDirectMessageClick}
						className='addChannelIcon'
						style={{
							fontSize: "1.3rem",
							paddingLeft: "5px",
							marginRight: "15px",
							cursor: "pointer",
						}}
						name='plus circle'
					/>
				</SideBarListHeader>
				{users?.length > 0 && users.map((u) => user(u, teamId, username))}
			</SideBarList>
		</div>
		{isOwner && (
			<div>
				<a
					style={{ padding: "10px" }}
					href='#invite-people'
					onClick={onInvitePeople}>
					+ Invite People
				</a>
			</div>
		)}
	</ChannelWrapper>
);

export default withRouter(Channels);
