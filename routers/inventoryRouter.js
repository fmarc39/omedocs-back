// Récupère Express
const express = require('express');
// On rcupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// Importe le controller qui gère l'inventaire d'un vendeur
const inventoryController = require('../controllers/inventoryController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// On crée une route pour ajouter un médicament à l'inventaire du vendeur
router.post('/addProduct', inventoryController.createProduct);
// Récupère l'inventaire du vendeur
router.get('/inventory/:userId', inventoryController.getInventory);

// Export la constante 'router'
module.exports = router; 