import React from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import {
	Message,
	Form,
	Container,
	Header,
	Input,
	Button,
} from "semantic-ui-react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { Link } from "react-router-dom";
import { wsLink } from "../ApolloClient";

class Login extends React.Component {
	constructor(props) {
		super(props);

		extendObservable(this, {
			email: "",
			password: "",
			errors: {},
		});
	}

	onChange = (e) => {
		const { name, value } = e.target;
		this[name] = value;
	};

	onSubmit = async () => {
		this.errors = {};
		const { email, password } = this;
		console.log(email, password);
		const response = await this.props.mutate({
			variables: { email, password },
		});

		console.log(response.data);

		const { ok, token, refreshToken, errors } = response.data.login;
		if (ok) {
			localStorage.setItem("token", token);
			localStorage.setItem("refreshToken", refreshToken);
			wsLink.subscriptionClient.tryReconnect();
			this.props.history.push("/view-team/just-logged-in");
		} else {
			const err = {};
			errors.forEach(({ path, message }) => {
				err[`${path}Error`] = message;
			});

			this.errors = { ...err };
		}
	};

	render() {
		const {
			email,
			password,
			errors: { emailError, passwordError, nameError },
		} = this;

		const errorList = [];

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
					<Header as='h1'>Login</Header>
				</div>
				{/* {usernameError || emailError || passwordError ? (
						<Message
							error
							header={"There was some errors with your submission"}
							list={errorList}
						/>
					) : null} */}
				{errorList.length > 0 && (
					<Message
						error
						header={"There was some errors with your submission"}
						list={errorList}
					/>
				)}
				<Form>
					<Form.Field error={!!emailError}>
						<Input
							onChange={this.onChange}
							name='email'
							fluid
							placeholder='Email'
							value={email}
						/>
					</Form.Field>

					<Form.Field error={!!passwordError}>
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
						<p style={{ marginRight: "10px" }}> Don't have an account?</p>
						<Link to='/register'>
							<p>Sign Up Here</p>
						</Link>
					</span>
				</div>
			</Container>
		);
	}
}

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(LOGIN)(observer(Login));
