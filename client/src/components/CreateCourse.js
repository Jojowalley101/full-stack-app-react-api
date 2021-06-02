
/**
 * CreateCourse - This component provides the "Create Course" screen by rendering a form that allows a user to create a new course.
 * The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route.
 * This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
 */



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
//mport CreateCourse from './Form';

export default class UserSignIn extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;


        const authUser = this.props.context.authenticatedUser;

        return (
            <div className="wrap">
                <h1>Create Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <label >Course Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={this.change}
                                placeholder="Course Title" />
                            <p>By {authUser.firstName} {authUser.lastName} </p>
                            <label >Course Description</label>
                            <textarea
                                id="description"
                                name="description"
                                type="text"
                                value={description}
                                onChange={this.change}
                                placeholder="Description" />
                            <label >Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                value={estimatedTime}
                                onChange={this.change}
                                placeholder="Estimated Time" />
                            <label >Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                type="text"
                                value={materialsNeeded}
                                onChange={this.change}
                                placeholder="Materials Needed" />
                        </React.Fragment>
                    )} />
                {/* <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p> */}
            </div>
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
    const authUser = context.authenticatedUser;
    const userId = authUser.id;

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded
    } = this.state;

    const course = { title, description, estimatedTime, materialsNeeded, userId }
    
    context.data.createCourses(course, authUser.emailAddress, authUser.password)
        .then((errors) => {
            if (errors.length) {
                this.setState({ errors })
            } else {
                this.props.history.push("/");
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
