
/**
 *  Header- Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user)
 * or the user's name and a button for signing out (if there's an authenticated user).
 * */

import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser  = context.authenticatedUser;
       //console.log(authUser);
        return (
            <body>
                <div id="root">
            <header>
            <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        {authUser ? (
                            <React.Fragment>
                               <span>Welcome, {authUser.firstName} {authUser.lastName}!         </span>
                                <Link to="/signout"> Sign Out</Link>
                            </React.Fragment>
                        ) : 
                        
                        (
                                <React.Fragment>
                                    <Link className="signup" to="/signup">Sign Up   </Link>
                                    <Link className="signin" to="/signin"> Sign In</Link>
                                </React.Fragment>
                            )}
                    </nav>
                </div>
            </header>
                </div>
            </body>
        );
    }
};
