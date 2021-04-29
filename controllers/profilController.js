// On importe les fonctions du fichier profilDataMapper
const { updateEmail, updatePhoneNumber } = require('../dataMappers/profilDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON les informations du profil modifié de l'utilisateur
    async editEmail (request, response, next) {
        // On récupère l'id de l'utilisateur et on le parse en integer
        const userId = parseInt(request.params.userId, 10);
 
        const { newEmail } = request.query;

        try {
            // Récupère les infos du profil modifié de l'utilisateur
            const profil = await updateEmail(newEmail, userId);

            // Si on ne récupère pas d'utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!profil) {
                next();
            };

            // Envoi des infos de l'utilisateur sous format JSON avec un statut de succès
            response.status(200).json({
                status: "success",
                profil
            });
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    async editPhoneNumber(request, response, next) {
        // On récupère l'id de l'utilisateur et on le parse en integer
        const userId = parseInt(request.params.userId, 10);

        const { newPhoneNumber } = request.query;

        try {
            // Récupère les infos du profil modifié de l'utilisateur
            const profil = await updatePhoneNumber(newPhoneNumber, userId);

            // Si on ne récupère pas d'utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!profil) {
                next();
            };

            // Envoi des infos de l'utilisateur sous format JSON avec un statut de succès
            response.status(200).json({
                status: "success",
                profil
            });
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }
}