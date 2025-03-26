const express = require('express');
const app = express();
const morgan=require('morgan');
const serverless = require('serverless-http');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api', require('./api/modelAircraft'));


module.exports = app;
module.exports.handler = serverless(app);