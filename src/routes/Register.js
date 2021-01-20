import React from "react";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

class Register extends React.Component {
	state = {
		username: "",
		usernameError: "",
		email: "",
		emailError: "",
		password: "",
		passwordError: "",
	};

	onChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	onSubmit = async () => {
		this.setState({
			usernameError: "",
			emailError: "",
			passwordError: "",
		});
		const { username, email, password } = this.state;

		const response = await this.props.mutate({
			variables: { username, email, password },
		});

		const { ok, errors } = response.data.register;

		if (ok) {
			this.props.history.push("/");
		} else {
			const err = {};
			errors.forEach(({ path, message }) => {
				err[`${path}Error`] = message;
			});

			this.setState(err);
		}
	};

	render() {
		const {
			username,
			email,
			password,
			usernameError,
			emailError,
			passwordError,
		} = this.state;

		const errorList = [];

		if (usernameError) {
			errorList.push(usernameError);
		}
		if (emailError) {
			errorList.push(emailError);
		}
		if (passwordError) {
			errorList.push(passwordError);
		}

		return (
			<Container text>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "40px",
					}}>
					<Header as='h1'>Register</Header>
				</div>
				{usernameError || emailError || passwordError ? (
					<Message
						error
						header={"There was some errors with your submission"}
						list={errorList}
					/>
				) : null}
				<div style={{ marginBottom: "25px" }}>
					<Input
						onChange={this.onChange}
						name='username'
						fluid
						placeholder='username'
						value={username}
						error={usernameError}
					/>
				</div>

				<div style={{ marginBottom: "25px" }}>
					<Input
						onChange={this.onChange}
						name='email'
						fluid
						placeholder='email'
						value={email}
						error={emailError}
					/>
				</div>

				<div style={{ marginBottom: "25px" }}>
					<Input
						onChange={this.onChange}
						name='password'
						fluid
						placeholder='password'
						type='password'
						value={password}
						error={passwordError}
					/>
				</div>
				<div></div>
				<Button size='big' fluid color='twitter' onClick={this.onSubmit}>
					Submit
				</Button>
			</Container>
		);
	}
}

const REGISTER_MUTATION = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			ok
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(REGISTER_MUTATION)(Register);
