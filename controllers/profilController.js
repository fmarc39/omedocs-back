// On importe les fonctions du fichier profilDataMapper
const { updateProfil } = require('../dataMappers/profilDataMapper');

// On export nos fonctions
module.exports = {
    async editProfil (request, response, next) {
        const userId = request.params.userId;

        try {
            const profil = await updateProfil(userId);

            if (!profil) {
                next();
            };

            response.status(200).json({
                status: "success",
                pofil
            });

        } catch (error) {
            next(error);
        }
    }
}