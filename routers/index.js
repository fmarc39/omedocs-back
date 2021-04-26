// Récupère Express
const express = require('express');

// Importe le fichier connectRouter qui s'occupe des endpoints de connexion
const connectRouter = require('./connectRouter');
// Importe le fichier inventoryRouter qui s'occupe des enpoints d'inventaire d'un utilisateur
const inventoryRouter = require('./inventoryRouter');
const listProductsRouter = require('./listProductsRouter');
const errorsMiddlewares = require('../controllers/errorsMiddlewares');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Utilise les fichiers importés 
router.use(connectRouter);
router.use(inventoryRouter);
router.use(listProductsRouter);

router.use(errorsMiddlewares.error404);
router.use(errorsMiddlewares.error500);

// Export la constante 'router' qui utilise le fichier connectRouter
module.exports = router;


/*
{
  "status": "success",  
  "products": [
    {
        "id": 1,
        "name": "Donormyl",
        "expiration_date": "01 août 2021",
        "quantity": "6",
        "unit_price": "3,24€",
        "cis_code": "4387",
        "user": [
            {
            "user_id": 1,
            "user_type": "seller",
            "establishment": "pharma",
            "rpps": "98675702",
            "finess": null,
            "adeli": null,
            "email": "email@gmail.com",
            "password": "$2b$10$OjdOrrYIzIh9Sy3QMygFieNYzQU1M3jBlwlLzTf/qMi.fLU9YiMX.",
            "phone_number": "43290543",
            "address": "1 rue Zoro",
            "city": "Green",
            "region": "Ile-de-France",
            "zip_code": "43109"
            },
            {
            "user_id": 5,
            "user_type": "seller",
            "establishment": "pharmatruc",
            "rpps": "98675h02",
            "finess": null,
            "adeli": null,
            "email": "email@gmail.com",
            "password": "$2b$10$OjdOrrYIzIh9Sy3QMygFieNYzQU1M3jBlwlLzTf/qMi.fLU9YiMX.",
            "phone_number": "43290543",
            "address": "5 rue machin",
            "city": "Green",
            "region": "Ile-de-France",
            "zip_code": "43109"
            },
        ]
    }
  ]
}
*/