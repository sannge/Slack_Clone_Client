import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Team from "./CreateTeam";
import ViewTeam from "./ViewTeam";
import decode from "jwt-decode";

const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	const refreshToken = localStorage.getItem("refreshToken");

	try {
		decode(token);
		decode(refreshToken);
	} catch (err) {
		return false;
	}
	return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
					}}
				/>
			)
		}
	/>
);

function RouterIndex() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				<PrivateRoute
					path='/view-team/:teamId?/:channelId?'
					exact
					component={ViewTeam}
				/>
				<PrivateRoute path='/create-team' exact component={Team} />
			</Switch>
		</Router>
	);
}

export default RouterIndex;
