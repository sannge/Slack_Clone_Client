import styled from "styled-components";
import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
const HeaderWrapper = styled.div`
	grid-column: 3;
	grid-row: 1;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const logout = (history) => {
	localStorage.removeItem("token");
	localStorage.removeItem("refreshToken");
	history.push("/");
};

const HeaderExporter = ({ channelName, history }) => (
	<HeaderWrapper>
		<div style={{ flex: 1 }}>
			<Header textAlign='center'>#{channelName}</Header>
		</div>
		<div style={{ marginRight: "20px" }}>
			<Button
				onClick={() => logout(history)}
				floated
				icon={<Icon name='sign-out'></Icon>}
				size='mini'></Button>
		</div>
	</HeaderWrapper>
);

export default withRouter(HeaderExporter);
