// On importe les fonctions du fichier listEstablishmentsDataMapper
const {findEstablishments } = require('../dataMappers/listEstablishmentsDataMapper');

// On export nos fonctions
module.exports = {

    async getsListEstablishments (request, response, next) {

        const {value, region} = request.query
        console.log(value, region)


      try {
          
        const establishments = await findEstablishments(value, region);

            if (!establishments) {
                response.status(401).json({
                    error: {
                        name: "search-Establishments_error",
                        detail: "bad-credentials"
                    }
                });
              next()
            };

            response.status(200).json({ 
                status: "success",
                establishments, 
            }); 
                console.log(establishments)
        } catch (error) {
            next(error);
        } 
    }
}
