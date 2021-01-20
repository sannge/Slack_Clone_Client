import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./Register";
import Home from "./Home";

function RouterIndex() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/register' exact component={Register} />
			</Switch>
		</Router>
	);
}

export default RouterIndex;
