// Récupère Express
const express = require('express');
// On récupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

<<<<<<< HEAD
// Importe le controller qui gère les commande d'un utilisateur
=======
// Importe le controller qui gère la liste de l'/des organisme(s) demandé(s)
>>>>>>> order
const orderController = require('../controllers/orderController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

<<<<<<< HEAD
// Route pour insérer les données d'une commande dans la base de données
router.post('/order', authMiddleware, orderController.createOrder);
router.get('/orders/:id', authMiddleware, orderController.getOrders)

// Export la constante 'router'
module.exports = router;
=======
// On crée une route pour lister l'/les organisme(s) demandé(s)
router.post('/saveOrder/:userId', authMiddleware, orderController.createOrder);
router.get('/orders/:userId', authMiddleware, orderController.getOrders);

// Export la constante 'router'
module.exports = router; 
>>>>>>> order
