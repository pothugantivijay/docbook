const authService = require('../services/login_service.js');
const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';

const post = async (request, response) => {
    try {
        console.log('Received POST request to /login');
        const username = request.body.username;
        const password = request.body.password;

        const user = await authService.validate_user(username, password);

        if (user) {
            const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
            response.status(200).json({ token });
        } else {
            response.status(401).json({ code: '401', message: 'Unauthorized Request' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    post,
};