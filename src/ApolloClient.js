import {
	ApolloClient,
	InMemoryCache,
	ApolloLink,
	split,
	createHttpLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";

import { WebSocketLink } from "@apollo/client/link/ws";

let httpLink = createUploadLink({
	uri: "http://localhost:8080/graphql",
});

let wsLink = new WebSocketLink({
	uri: "ws://localhost:8080/graphql",
	options: {
		reconnect: true,
		connectionParams: {
			token: localStorage.getItem("token"),
			refreshToken: localStorage.getItem("refreshToken"),
		},
	},
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
const httpLinkWithAuth = authLink.concat(httpLink);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLinkWithAuth
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default client;
