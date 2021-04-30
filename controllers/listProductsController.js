// On importe les fonctions du fichier listProductsDataMapper
const { findProductsByName, findProductsByCis } = require('../dataMappers/listProductsDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON le/les médicament(s)
    async getProductsByName (request, response, next) {
        // On récupère une partie/la totalité du nom du/des médicament(s)
        const productsValue = request.query.value;

        try {
            // Récupère le/les médicament(s)
            const products = await findProductsByName(productsValue);

            // Si on ne récupère pas au moins 1 médicament, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)  
            if (!products[0]) {
                next();

            } else {
                // Envoi du/des médicament(s) sous format JSON avec un statut de succès
                response.status(200).json({ 
                    status: "success",
                    products
                }); 
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    // Récupère et renvoit sous format JSON le/les médicament(s)
    async getProductsByCis (request, response, next) {
        // On récupère une partie/la totalité du nom du/des médicament(s)
        const productsValue = request.query.value;

        try {
            // Récupère le/les médicament(s)
            const products = await findProductsByCis(productsValue);

            // Si on ne récupère pas au moins 1 médicament, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)  
            if (!products[0]) {
                next();
                
            } else {
                // Envoi du/des médicament(s) sous format JSON avec un statut de succès
                response.status(200).json({ 
                    status: "success",
                    products
                }); 
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }
}