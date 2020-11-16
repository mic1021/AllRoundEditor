const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors());
// above is same as
// const express = require('express');
// const app = express();

const { favEquations, submitEquation } = require('./handlers/equations');
const { signup, login } = require('./handlers/users');
const FBAuth = require('./utils/fbAuth');

exports.api = functions.region('asia-northeast3').https.onRequest(app); //default region is us-central1

// Equation Routes
app.get('/favEquations', FBAuth, favEquations);
app.post('/submitEquation', FBAuth, submitEquation);

// User Routes
app.post('/signup', signup);
app.post('/login', login);
// https://baseurl.com/screams XXXX no good
// https://baseurl.com/api/screams OR
// https://api.baseurl.com/screams