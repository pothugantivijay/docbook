const loginRouter = require('./login_routes.js');
const doctorRouter = require('./doctorRoutes.js');
const patientRouter = require('./patientRoutes.js');

module.exports = function(application) {
    application.use('/login', loginRouter);
    application.use('/doctor',doctorRouter);
    application.use('/patient',patientRouter);
};
