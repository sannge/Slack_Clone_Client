import React from "react";
import {
	Form,
	Container,
	Header,
	Input,
	Button,
	Message,
} from "semantic-ui-react";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { Link } from "react-router-dom";

class Register extends React.Component {
	state = {
		username: "",
		usernameError: "",
		email: "",
		emailError: "",
		password: "",
		passwordError: "",
		nameError: "",
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
			nameError: "",
		});
		const { username, email, password } = this.state;

		const response = await this.props.mutate({
			variables: { username, email, password },
		});
		console.log(response);

		const { ok, errors } = response.data.register;

		if (ok) {
			this.props.history.push("/login");
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
			nameError,
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
		if (nameError) {
			errorList.push(nameError);
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
				{errorList.length ? (
					<Message
						error
						header={"There was some errors with your submission"}
						list={errorList}
					/>
				) : null}
				<Form>
					<Form.Field error={usernameError}>
						<Input
							onChange={this.onChange}
							name='username'
							fluid
							placeholder='Username'
							value={username}
						/>
					</Form.Field>

					<Form.Field error={emailError}>
						<Input
							onChange={this.onChange}
							name='email'
							fluid
							placeholder='Email'
							value={email}
						/>
					</Form.Field>

					<Form.Field error={passwordError}>
						<Input
							onChange={this.onChange}
							name='password'
							fluid
							placeholder='Password'
							type='password'
							value={password}
						/>
					</Form.Field>

					<Button size='big' fluid color='twitter' onClick={this.onSubmit}>
						Submit
					</Button>
				</Form>
				<div
					style={{
						marginTop: "15px",
						width: "100%",
					}}>
					<span style={{ display: "flex", justifyContent: "center" }}>
						<p style={{ marginRight: "10px" }}> Already have an account?</p>
						<Link to='/login'>
							<p>Sign in Here</p>
						</Link>
					</span>
				</div>
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
