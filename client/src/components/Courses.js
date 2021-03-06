
/**
 * Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses.
 * Each course needs to link to its respective "Course Detail" screen.
 * This component also renders a link to the "Create Course" screen.
 */

import React, { Component } from 'react';
//import Data from '../Data';

export default class Courses extends Component {
    state = {
        courses: []
        
    }

    componentDidMount() {
        const context = this.props.context;
        context.data.getCourses()
            .then(courses => this.setState({courses}))
        .catch((error) => {
            console.log(error);
            this.props.history.push('/error');

        });
    }

    render() {
        //console.log(this.state);
        const courses = this.state.courses;

       //console.log(courses);
        return (
            <main>
            <div className="wrap main--grid">
                {courses.map(course => 
                    <a className="course--module course--link" href={`courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                 
                )}
                <a className="course--module course--add--module" href="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
            </main>
        )
    }
}

