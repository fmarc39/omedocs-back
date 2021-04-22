// On importe les fonctions du fichier inventoryDataMapper
const { insertProduct } = require('../dataMappers/inventoryDataMapper');

// On export nos fonctions
module.exports = {

    // Récupère et renvoie sous format JSON les informations du médicament ajouté à l'inventaire du vendeur
    async createProduct (request, response) {

        // Récupère les infos du médicament
        const newProduct = await insertProduct(
            request.body.name,
            request.body.expiration_date,
            request.body.number_of_boxes,
            request.body.quantity_in_box,
            request.body.mass,
            request.body.volume, 
            request.body.unit_price,
            request.body.composition,
            request.body.dosage_form, 
            request.body.cis_code,
            request.body.user_id
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
        response.status(201).json({ data: newProduct });
    },

};