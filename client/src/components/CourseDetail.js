/**
* CourseDetail - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.
* The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course.
* This component also renders an "Update Course" button for navigating to the "Update Course" screen.
*/

import React, { Component } from 'react';
//import Data from '../Data';

export default class Courses extends Component {
    state = {
        course: [],
        user: { },
        id: this.props.match.params.id

    }

    componentDidMount() {
        const context = this.props.context;
        context.data.getCourse(this.state.id)
            .then(course => this.setState({ course , user: course.User }))
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state);
        const course = this.state.course;
        const user = this.state.user;
        const authUser = this.props.context.authenticatedUser;
        // console.log(authUser.id);
        // console.log(user);
        // console.log(course.userId);
        return (
            <div>
            <div className="actions--bar">
                    <div className="wrap">
                        {(authUser && authUser.id === course.userId) ? (
                        <div>
                        <a className="button" href={`/courses/${course.id}/update`}>Update Course</a>
                        <a className="button" href={`/courses/${course.id}/delete`}>Delete Course</a>
                        <a className="button button-secondary" href="/">Return to List</a> 
                        </div> ) :
                        ( <a className="button button-secondary" href="/">Return to List</a> )} 
                        
                        </div>
                </div>
                
            <div className="wrap">
                <div>
                    <h3 className="course--detail--title">Course Detail</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p> By { `${user.firstName} ${user.lastName}`} </p>
                    <p>{course.description}</p>
                   </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list"></ul> {course.materialsNeeded}
                </div>
            </div>
            </div>
        )
    }
}

