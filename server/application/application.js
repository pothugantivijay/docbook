const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./routes/index.js');
const session        = require('express-session');

const path = require('path');

const initialize = ( application ) => {

    application.use(cors());
    application.use(express.json());
    application.use(express.urlencoded());
    application.use(express.static(path.join(__dirname ,'..','public')));
    
    application.use(session({
        secret: 'your-secret-key',
    }));

    mongoose.connect('mongodb+srv://chebrolus:sai123@testcluster.tcwunuu.mongodb.net/coursedb?retryWrites=true&w=majority');
    registerRouter(application);
};

module.exports = initialize;