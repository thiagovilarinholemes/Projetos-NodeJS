/**
 * Athor: Thiago Vilarinho Lemes
 * Data: 23/09/2020
 * version: 0.0.1
 * Description: API para o processo seletivo da Opens 
 */

'use strict';

/** Imports */
const express = require('express');
const app = express();
const indexRoute = require('./routes/index-routes');
const userRoute = require('./routes/user-routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const constants = require('./utils/constants');

/** Config body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/** Connect database */
mongoose.connect(constants.URL_DB,  
    { 
        useNewUrlParser: true,  
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    function(err){
        if(err){ console.log('Error in connected:' + err); } 
        else { console.log('Successfully connected!!! ')}
    }
);

/** Routes */
app.use('/', indexRoute);
app.use('/user',userRoute);

/** Export */
module.exports = app;