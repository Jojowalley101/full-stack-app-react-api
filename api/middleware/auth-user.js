'use strict';

const auth = require('basic-auth');
const { Users } = require('../models')
const { Courses } = require('../models');
const bcrypt = require('bcryptjs');
//const routes = require('../routes');


/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next) => {
    let message;

    const credentials = auth(req);
    //console.log(credentials);
    if (credentials) {
        const user = await Users.findOne({ where: { emailAddress: credentials.name } });
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for email: ${user.emailAddress}`);

                // Store the user on the Request object.
                req.currentUser = user;
            } else {
                message = `Authentication failure for email: ${user.lastName}`;
            }
        } else {
            message = `User not found for email: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
};


