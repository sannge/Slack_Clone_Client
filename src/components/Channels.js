import styled from "styled-components";
import React from "react";

const ChannelWrapper = styled.div`
	grid-column: 2;
	grid-row: 1 / 4;
	background: #4e3a4c;
	color: #958993;
`;

const TeamNameHeader = styled.h1`
	color: #fff;
	font-size: 20px;
`;

const SideBarList = styled.ul`
	width: 100%;
	list-style: none;
	padding-left: 0px;
`;

const paddingLeft = `padding-left: 10px`;

const SideBarListItem = styled.li`
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

const channel = ({ id, name }) => (
	<SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
);

const user = ({ id, name }) => (
	<SideBarListItem key={`user-${id}`}>
		<Bubble /> {name}
	</SideBarListItem>
);

export default ({ teamName, username, channels, users }) => (
	<ChannelWrapper>
		<PushRight>
			<TeamNameHeader>{teamName}</TeamNameHeader>
			{username}
		</PushRight>
		<div>
			<SideBarList>
				<SideBarListHeader>Channels</SideBarListHeader>
				{channels?.length > 0 && channels.map(channel)}
			</SideBarList>
		</div>

		<div>
			<SideBarList>
				<SideBarListHeader>Direct Messages</SideBarListHeader>
				{users?.length > 0 && users.map(user)}
			</SideBarList>
		</div>
	</ChannelWrapper>
);
