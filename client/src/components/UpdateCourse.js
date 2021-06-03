
/**
* UpdateCourse - This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses.
* The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route.
* This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
*/


import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Form from './Form';

export default class UpdateCourse extends Component {

state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userStuff: {},
    errors: []
}

componentDidMount() {
    const context = this.props.context;
    const id = this.props.match.params.id
    context.data.getCourse(id)
        .then(course => this.setState({ title: course.title, description: course.description, estimatedTime: course.description, materialsNeeded: course.materialsNeeded, userStuff: course.User }))
        .catch((error) => {
            console.log(error);
            this.props.history.push('/error');
        });
}

render() {
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userStuff,
        errors,
    } = this.state;
    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                    <ReactMarkdown>
                    <label >Course Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={this.change}
                            placeholder="Course Title" />
                            <p>By {userStuff.firstName} {userStuff.lastName} </p>
                        <label >Course Description</label>
                        <input
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
                    </ReactMarkdown>
                )} />
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
    const id = this.props.match.params.id;
    const { emailAddress, password } = context.authenticatedUser;
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded
    } = this.state;

    const course = {title, description, estimatedTime, materialsNeeded }

    context.data.updateCourse(id, course, emailAddress, password)
        .then((errors) => {
            if (errors.length) {
                this.setState({errors})
            } else {
                this.props.history.push(`/courses/${id}/update`);
            }
        }
    )
    .catch((error) => {
        console.log(error);
        this.props.history.push('/notfound');
        
    });
}

cancel = () => {
    this.props.history.push(`/courses`);

}

}
