/**
* CourseDetail - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.
* The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course.
* This component also renders an "Update Course" button for navigating to the "Update Course" screen.
*/

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
//import Data from '../Data';

export default class Courses extends Component {
    state = {
        course: [],
        user: {},
        id: this.props.match.params.id,
        errors: []
        

    }

    componentDidMount() {
        const context = this.props.context;
        //console.log(context);
        //console.log(this.state.id);


        //console.log(context.data.getCourse(this.state.id))
        context.data.getCourse(this.state.id)
            .then(course => this.setState({ course , user: course.User }))
            .catch((error) => {
                console.log(error);
                this.props.history.push('/error');
            });
    }

    handleClick() {
       
        this.props.context.data.deleteCourse(this.props.match.params.id, this.props.context.authenticatedUser.emailAddress, this.props.context.authenticatedUser.password)
        .then(errors => {
            if (!errors) {
                this.setState({errors});
            } else {
                this.props.history.push('/');
            }
        })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/error');
            });
    }

    render() {
       
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
                        <button className="button" onClick={() => this.handleClick()} href="/">Delete Course</button>
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
                    <p> {course.description}</p>
                   </div>
                <div>
                    {/* <ReactMarkdown> */}
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list"></ul> {course.materialsNeeded}
                    {/* </ReactMarkdown> */}
                </div>
            </div>
            </div>
        )
    }
}

