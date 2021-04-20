const express = require('express');

const connectController = require('../controllers/connectController'); 
const authToken = require('../controllers/authentificateController');

const router = express.Router();

// router.get('/posts', authToken, connectController.getPosts);
router.post('/signup', connectController.signup);
router.post('/login', connectController.login); 

module.exports = router; 