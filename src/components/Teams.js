import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { withRouter } from "react-router-dom";

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

const team = ({ id, letter }, location) => (
	<EachTeamItem key={`team-${id}`}>
		<NavLink
			isActive={() =>
				location.pathname.search(`view-team/${id}`) !== -1 ||
				location.pathname.search(`view-team/user/${id}`) !== -1
			}
			activeClassName='active'
			to={`/view-team/${id}`}>
			<TeamListItem className='listItem'>{letter}</TeamListItem>
		</NavLink>
	</EachTeamItem>
);
const Teams = ({ teams, location }) => (
	<TeamWrapper>
		<TeamList>
			<div>
				<NavLink to='/create-team'>
					<EachTeamItem>
						<TeamListItem style={{ fontSize: "3rem" }}>+</TeamListItem>
					</EachTeamItem>
				</NavLink>
				{teams.map((t) => team(t, location))}
			</div>
		</TeamList>
	</TeamWrapper>
);

export default withRouter(Teams);
