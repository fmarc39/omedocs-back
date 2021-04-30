// Récupère Express
const express = require('express');

// Importe le controller qui gère les paiements via Stripe
const stripeController = require('../controllers/stripeController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route qui renvoit la clé Stripe au front
router.get('/stripe', stripeController.sendStripeKey);
// Route qui initialise l'instance de paiement
router.post('/stripe/checkout', stripeController.initializePaymentInstance);

// Export la constante 'router'
module.exports = router; 