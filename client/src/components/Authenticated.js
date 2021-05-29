import React from 'react';

export default ({ context }) => {
    const authUser = context.authenticatedUser;
    return (
        <div className="wrap">
            <div className="wrap header--flex">
                <h1>{authUser.name} is authenticated!</h1>
                <p>Your email is {authUser.emailAddress}.</p>
            </div>
        </div>
    );
}
