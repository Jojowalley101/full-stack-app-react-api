// import statements below 
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from "./components/CourseDetail";
import withContext from './Context';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';


import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
// import Authenticated from './components/Authenticated';
import Forbidden from './components/Forbidden';


import PrivateRoute from './PrivateRoute';

//use of withContext of each route is below

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const propsWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);

//const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const NotFoundWithContext = withContext(NotFound);
const UnhandledErrorWithContext = withContext(UnhandledError);
const ForbiddenWithContext = withContext(Forbidden);


//This is the page that allow for all of my routes to work and be accessed 

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={propsWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/notfound" component={NotFoundWithContext} /> 
        <Route path="/forbidden" component={ForbiddenWithContext} />
        <Route path="/error" component={UnhandledErrorWithContext} />
        <Route>
          <Redirect to="/notfound" />
        </Route>
      </Switch>
    </div>
  </Router>
);
