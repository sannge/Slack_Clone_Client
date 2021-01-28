import styled from "styled-components";
import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

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
	padding: 2px;
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

const channel = ({ id, name }, teamId) => (
	<NavLink
		activeClassName='activeLink'
		className='link'
		key={`channel-${id}`}
		to={`/view-team/${teamId}/${id}`}>
		<SideBarListItem className='sidebarlistitem'># {name}</SideBarListItem>
	</NavLink>
);

const user = ({ id, name }) => (
	<SideBarListItem key={`user-${id}`}>
		<Bubble /> {name}
	</SideBarListItem>
);

export default ({
	teamName,
	username,
	channels,
	users,
	onAddChannelClick,
	teamId,
	onInvitePeople,
	isOwner,
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
				{channels?.length > 0 && channels.map((c) => channel(c, teamId))}
			</SideBarList>
		</div>

		<div>
			<SideBarList>
				<SideBarListHeader>Direct Messages</SideBarListHeader>
				{users?.length > 0 && users.map(user)}
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
