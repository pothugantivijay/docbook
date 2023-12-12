const express = require('express');
const initialize = require('./application/application.js');
const dotenv = require('dotenv');

dotenv.config();

const application = express();
const port        = process.env.SERVER_PORT;
initialize(application);
application.listen(port, () => console.log("Server listening at port 5001"));