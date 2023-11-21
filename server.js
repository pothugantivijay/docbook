const express = require('express');
const initialize = require('./application/application.js');

const application = express();
const port        = 3000;
initialize(application);
application.listen(port, () => console.log("Server listening at port 3000"));