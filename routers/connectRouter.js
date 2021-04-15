const express = require('express');

const connectController = require('../controllers/connectController'); 

const router = express.Router();

router.get('/', eventsController.events); 

module.exports = router; 