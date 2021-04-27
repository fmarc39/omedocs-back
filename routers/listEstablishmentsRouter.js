// Récupère Express
const express = require('express');

// Importe le controller qui gère la liste de l'/des organisme(s) demandé(s)
const listEstablishmentsController = require('../controllers/listEstablishmentsController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// On crée une route pour lister l'/les organisme(s) demandé(s)
router.get('/searchestablishments', listEstablishmentsController.getsListEstablishments);

// Export la constante 'router'
module.exports = router; 