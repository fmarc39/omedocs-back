// Récupère Express
const express = require('express');

// Importe le fichier connectRouter qui s'occupe des endpoints de connexion
const connectRouter = require('./connectRouter');
// Importe le fichier inventoryRouter qui s'occupe des enpoints d'inventaire d'un utilisateur
const inventoryRouter = require('./inventoryRouter');
const errorsMiddlewares = require('../controllers/errorsMiddlewares');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Utilise les fichiers importés 
router.use(connectRouter);
router.use(inventoryRouter);

router.use(errorsMiddlewares.error404);
router.use(errorsMiddlewares.error500);

// Export la constante 'router' qui utilise le fichier connectRouter
module.exports = router;