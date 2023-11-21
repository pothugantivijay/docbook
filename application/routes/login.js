const loginRouter = require('./login_routes.js');
const userController = require('../controllers/login_controller.js');

module.exports = function(application) {
    application.post('/login', userController.post);
};
