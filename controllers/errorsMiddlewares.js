module.exports = {

    async error404(request, response) {
        response.status(404).json({
            error: {
                message: "Ressource not found",
                url: request.url,
                method: request.method
            }
        })
    },

    async error500(error, _, response) {
        response.status(500).json({
            error: {
                message: "Fatal error",
                infos: error
            }
        })
    }

}