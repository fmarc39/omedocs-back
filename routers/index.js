// Récupère Express
const express = require('express');

// Importe le fichier connectRouter qui s'occupe des endpoints de connexion
const connectRouter = require('./connectRouter');

// permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Utilise le fichier connectRouter
router.use(connectRouter);

// Export la constante 'router' qui utilise le fichier connectRouter
module.exports = router;