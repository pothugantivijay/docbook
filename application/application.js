const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./routes/login.js');

const path = require('path');

const initialize = (application) => {

    application.use(cors());
    application.use(express.json());
    application.use(express.urlencoded());
    application.use(express.static(path.join(__dirname, '..', 'public')));
    mongoose.connect('mongodb+srv://vakiti98:Saikumar%401998@cluster0.2mudu8m.mongodb.net/');
    registerRouter(application);
};

module.exports = initialize;