// On importe les fonctions du fichier inventoryDataMapper
const { insertProduct, findUserInventory } = require('../dataMappers/inventoryDataMapper');

// On export nos fonctions
module.exports = {

    // Récupère et renvoit sous format JSON les informations du médicament ajouté à l'inventaire du vendeur
    async createProduct (request, response, next) {
        try {            
            // Récupère les infos du médicament
            const newProduct = await insertProduct(
                request.body.name,
                request.body.expiration,
                request.body.quantity,
                request.body.price,
                request.body.cis,
                request.body.user_id,
            );

            // Si on ne récupère pas de médicament, on envoit une erreur indiquant une mauvaise requête du client (400)
            if (!newProduct) {
                response.status(400).json({
                    error: {
                        message: "newProduct_impossible"
                    }
                });
                return;
            }

            // Envoi des infos du médicament sous format JSON avec un status de succès
            response.status(201).json({ addedProduct: newProduct });
        } catch (error) {
            next(error);
        }
    },

    // Récupère et renvoit sous format JSON l'inventaire du vendeur
    async getInventory(request, response, next) {
        // On récupère l'id de l'utilisateur et on le parse en integer
        const userId = parseInt(request.params.userId, 10);

        try {
            // Récupère les médicaments dans l'inventaire du vendeur
            const userInventory = await findUserInventory(userId);

            // Si aucun inventaire du vendeur n'est trouvé, on renvoit une erreur d'authentification (401)
            if (!userInventory) {
                response.status(401).json({
                    error: {
                        name: "authentification_error",
                        detail: "bad-credentials"
                    }
                });
            };
            
            // Envoi de l'inventaire du vendeur sous format JSON avec un status de succès
            response.status(200).json({ 
                status: "success",
                userInventory, 
            }); 
        } catch (error) {
            next(error);
        }
    },

};