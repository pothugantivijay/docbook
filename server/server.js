const express = require('express');
const initialize = require('./application/application.js');

const application = express();
const port        = 5000;
initialize(application);
application.listen(port, () => console.log("Server listening at port 5000"));