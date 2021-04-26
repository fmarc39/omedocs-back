// On importe les fonctions du fichier inventoryDataMapper
const { findProductsByName } = require('../dataMappers/listProductsDataMapper');

// On export nos fonctions
module.exports = {

    async getsProductsByName (request, response, next) {

        const productsName = request.query.name;

        try {
            const products = await findProductsByName(productsName);

            if (! products) {
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
                products, 
            }); 
                console.log(products)
        } catch (error) {
            next(error);
        }
    },

    async getsProductsByCis (request, response, next) {
        const productsCis = request.query.cis;

        try {
            const products = await findProductsByCis(productsCis);

            if (! products) {
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
                products, 
            }); 
        } catch (error) {
            next(error);
        }
    }

}