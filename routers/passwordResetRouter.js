// Récupère Express
const express = require('express');

// Importe le controller qui ...
const passwordResetController = require('../controllers/passwordResetController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

router.post('/forgotPassword/:userId', passwordResetController.createNewPassword);

// Export la constante 'router'
module.exports = router; 