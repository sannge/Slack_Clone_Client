import React from "react";
import { GET_TEAM_MEMBERS } from "../graphql/team";
import { Dropdown } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

function MultiSelectUsers({
	value,
	handleChange,
	placeholder,
	teamId,
	currentUserId,
}) {
	console.log(teamId);
	const { data, loading, error } = useQuery(GET_TEAM_MEMBERS, {
		variables: { teamId: teamId },
	});
	if (loading) {
		return null;
	}

	return (
		<Dropdown
			placeholder={placeholder}
			value={value}
			fluid
			multiple
			search
			selection
			onChange={handleChange}
			options={data.getTeamMembers
				.filter((tm) => tm.id !== currentUserId)
				.map((tm) => ({
					key: tm.id,
					value: tm.id,
					text: tm.username,
				}))}
		/>
	);
}

export default MultiSelectUsers;
