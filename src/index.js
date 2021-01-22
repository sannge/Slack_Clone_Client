import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import Routes from "./routes";

import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	ApolloProvider,
	ApolloLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import "semantic-ui-css/semantic.min.css";

let httpLink = createHttpLink({
	uri: "http://localhost:8080/graphql",
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			"x-token": localStorage.getItem("token"),
			"x-refresh-token": localStorage.getItem("refreshToken"),
		},
	};
});

//AFTERWARES LIST: [operation.getContext().response.headers === headers response from the server, forward(operation).map(response === response body from the server)]
const afterwareLink = new ApolloLink((operation, forward) => {
	//need to return forrward(operration)
	return forward(operation).map((response) => {
		const context = operation.getContext();
		const token = context.response.headers.get("x-token");
		const refreshToken = context.response.headers.get("x-refresh-token");
		if (token) {
			localStorage.setItem("token", token);
		}
		if (refreshToken) {
			localStorage.setItem("refreshToken", refreshToken);
		}

		//import to return the response so that it passes response
		//to the inner graphql methods
		return response;
	});
});

httpLink = afterwareLink.concat(httpLink);

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const App = () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
