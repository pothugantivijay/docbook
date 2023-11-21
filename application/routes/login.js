const loginRouter = require('./login_routes.js');
const doctorRoutes = require('../routes/doctorRoutes.js');
const patientRoutes = require('../routes/patientRoutes.js');
const userController = require('../controllers/login_controller.js');

module.exports = function (application) {
    application.post('/login', userController.post);
    application.use('/', doctorRoutes);
    application.use('/', patientRoutes);
};
