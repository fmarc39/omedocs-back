// On importe les fonctions du fichier listEstablishmentsDataMapper
const {findEstablishments } = require('../dataMappers/listEstablishmentsDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON l'/les organismes
    async getsListEstablishments (request, response, next) {
        // On récupère une partie/la totalité du nom de l'/des organisme(s) et/ou la région
        const {value, region} = request.query

        try {
            // Récupère l'/les organisme(s)
            const establishments = await findEstablishments(value, region);

            // Si on ne récupère pas d'organisme(s), on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)  
            if (!establishments) {
                next()
            };
            
            // Envoi de l'/des organisme(s) sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                establishments, 
            }); 
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        } 
    }
}
