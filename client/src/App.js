import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from "./components/CourseDetail";
import withContext from './Context';
// import Public from './components/Public';
// import NotFound from './components/NotFound';
// import UserSignUp from './components/UserSignUp';
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// import Authenticated from './components/Authenticated';

//import withContext from './Context';
// import PrivateRoute from './PrivateRoute';

const CoursesWithContext = withContext(Courses);
//const HeaderWithContext = withContext(Header);



// const AuthWithContext = withContext(Authenticated);
// const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);
// const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <div>
      {/* <Header /> */}

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/CourseDetail" component={CourseDetail} />
        {/* <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
);



// export default () => (
//   <Router>
//     <div>
//       <HeaderWithContext />

//       <Switch>
//         <Route exact path="/" component={Public} />
//         <PrivateRoute path="/authenticated" component={AuthWithContext} />
//         <Route path="/signin" component={UserSignInWithContext} />
//         <Route path="/signup" component={UserSignUpWithContext} />
//         <Route path="/signout" component={UserSignOutWithContext} />
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   </Router>
// );