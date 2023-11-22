const loginRouter = require('./login_routes.js');
const doctorRoutes = require('../routes/doctorRoutes.js');
const patientRoutes = require('../routes/patientRoutes.js');
const doctorSearchRoute = require('../routes/doctorSearchRoutes.js');

module.exports = function (application) {
    application.use('/', loginRouter);
    application.use('/', doctorRoutes);
    application.use('/', patientRoutes);
    application.use('/', doctorSearchRoute);
};
