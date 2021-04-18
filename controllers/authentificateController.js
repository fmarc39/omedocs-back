require('dotenv').config();
const jwt = require('express-jwt');

exports.authorizationMiddleware =  jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

