import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Team from "./CreateTeam";

function RouterIndex() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				<Route path='/create-team' exact component={Team} />
			</Switch>
		</Router>
	);
}

export default RouterIndex;
