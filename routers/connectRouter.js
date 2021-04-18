const express = require('express');

const connectController = require('../controllers/connectController'); 

const router = express.Router();

// router.get('/posts', authToken, connectController.getPosts);
// router.delete('/logout', connectController.deleteRefreshToken);
router.post('/register', connectController.register);
// router.post('/login', connectController.login); 

module.exports = router; 