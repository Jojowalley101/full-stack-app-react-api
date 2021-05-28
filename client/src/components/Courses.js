
/**
 * Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses.
 * Each course needs to link to its respective "Course Detail" screen.
 * This component also renders a link to the "Create Course" screen.
 */

import React, { Component } from 'react';
import CourseDetail from './CourseDetail';
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
        });
    }

    render() {
        console.log(this.state);
        const courses = this.state.courses;

        console.log(courses);
        return (
            <div className="wrap main--grid">
                {courses.map(course => 
                    <a className="course--module course--link" href={`courses/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                 
                )}
                
               
            </div>
        )
    }
}