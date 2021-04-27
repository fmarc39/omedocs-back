// On importe les fonctions du fichier inventoryDataMapper
const { findProductsByName, findProductsByCis } = require('../dataMappers/listProductsDataMapper');

// On export nos fonctions
module.exports = {

    async getProductsByName (request, response, next) {

        const productsValue = request.query.value;

        try {
            const products = await findProductsByName(productsValue);

            // Si on ne récupère pas de médicament(s), on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)  
            if (!products) {
                next();
            };

            // Envoi de l'inventaire du vendeur sous format JSON avec un status de succès
            response.status(200).json({ 
                status: "success",
                products, 
            }); 
                console.log(products)
        } catch (error) {
            next(error);
        }
    },

    async getProductsByCis (request, response, next) {
        const productsValue = request.query.value;

        try {
            const products = await findProductsByCis(productsValue);

            // Si on ne récupère pas de médicament(s), on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)  
            if (!products) {
                next();
            };

            // Envoi de l'inventaire du vendeur sous format JSON avec un status de succès
            response.status(200).json({ 
                status: "success",
                products, 
            }); 
        } catch (error) {
            next(error);
        }
    }

}