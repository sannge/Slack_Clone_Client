import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

const Home = ({ data: { loading, allUsers, error } }) =>
	loading ? null : allUsers.map((u) => <h1 key={u.id}>{u.email}</h1>);

const ALLUSERSQUERY = gql`
	{
		allUsers {
			id
			email
		}
	}
`;

export default graphql(ALLUSERSQUERY)(Home);
