const express = require('express');
const morgan=require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '.public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.public/index.html'));
});

app.use('/api', require('./api/modelAircraft'));


module.exports = app;
