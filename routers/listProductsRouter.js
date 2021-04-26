// Récupère Express
const express = require('express');

// Importe le controller qui gère l'inventaire d'un vendeur
const listProductsController = require('../controllers/listProductsController');
const authToken = require('../controllers/authentificateController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// On crée une route pour ajouter un médicament à l'inventaire du vendeur
router.get('/productsbyname', listProductsController.getsProductsByName);

router.get('/productsbycis', listProductsController.getsProductsByCis);

// Export la constante 'router'
module.exports = router; 