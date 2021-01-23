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

class CreateTeam extends React.Component {
	constructor(props) {
		super(props);

		extendObservable(this, {
			name: "",
			errors: {},
		});
	}

	onChange = (e) => {
		const { name, value } = e.target;
		this[name] = value;
	};

	onSubmit = async () => {
		this.errors = {};
		const { name } = this;
		let response = null;

		try {
			response = await this.props.mutate({
				variables: { name },
			});
		} catch (err) {
			console.log(err);
			this.props.history.push("/login");
			return;
		}

		console.log(response);

		// console.log(this.props.data.networkStatus);

		const { ok, errors } = response.data.createTeam;
		if (ok) {
			this.props.history.push("/");
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
			name,
			errors: { nameError },
		} = this;

		const errorList = [];

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
					<Header as='h1'>Create a Team</Header>
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
					<Form.Field error={!!nameError}>
						<Input
							onChange={this.onChange}
							name='name'
							fluid
							placeholder='Name'
							value={name}
						/>
					</Form.Field>

					<Button size='big' fluid color='twitter' onClick={this.onSubmit}>
						Create
					</Button>
				</Form>
			</Container>
		);
	}
}

const CREATE_TEAM = gql`
	mutation createTeam($name: String!) {
		createTeam(name: $name) {
			ok
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(CREATE_TEAM)(observer(CreateTeam));
