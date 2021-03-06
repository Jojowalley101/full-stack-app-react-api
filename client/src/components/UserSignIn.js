
/**
 * UserSignIn - This component provides the "Sign In" screen by rendering a form that allows a user to sign in using their existing account information.
 * The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';


export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                {/* <form> */}
                                <label for="emailAdress">Email Address</label>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <label for="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                                {/* </form> */}
                            </React.Fragment>
                        )} />
                    <p>
                        Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
                </div>
            </main>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
        
        context.actions.signIn(emailAddress, password)
            .then((emailAddress) => {
                if (emailAddress === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful'] };
                    });
                } else {
                    this.props.history.push(from);
                }
            })
            .catch((error) => {
                console.error(error);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }
}
