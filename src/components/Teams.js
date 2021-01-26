import styled from "styled-components";
import { NavLink } from "react-router-dom";

const TeamWrapper = styled.div`
	grid-column: 1;
	grid-row: 1 / 4;
	background: #362234;
	color: #958993;
`;

const TeamList = styled.ul`
	width: 100%;
	padding-left: 0px;
	list-style: none;
`;

const TeamListItem = styled.li`
	cursor: pointer;
	height: 50px;
	width: 50px;
	background-color: #676066;
	color: #fff;
	margin: auto;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	border-radius: 11px;
	transition: border 0.05s ease-in-out;
	&:hover {
		border-style: solid;
		border-width: thick;
		border-color: #767676;
	}
`;

const EachTeamItem = styled.div`
	& .active .listItem {
		border-style: solid;
		border-width: thick;
		border-color: #767676;
	}
`;

const team = ({ id, letter }, index) => (
	<EachTeamItem key={`team-${id}`}>
		<NavLink activeClassName='active' to={`/view-team/${id}`}>
			<TeamListItem className='listItem'>{letter}</TeamListItem>
		</NavLink>
	</EachTeamItem>
);
export default ({ teams }) => (
	<TeamWrapper>
		<TeamList>{teams.map(team)}</TeamList>
	</TeamWrapper>
);
