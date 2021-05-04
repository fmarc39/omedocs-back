// On importe les fonctions du fichier orderDataMapper
const { findSales, updateOrderStatus } = require('../dataMappers/salesDataMapper');

// On export notre fonction
module.exports = {
    async getSales (request, response, next) {
        const userId = parseInt(request.params.user_id, 10);
        console.log('userId: ', userId);
        
        try {
            const sales = await findSales(userId);

            for (let sale of sales) {
                sale["date"] = sale.date.toISOString().split('T')[0];
            };

            if (!sales) {
                next();
            } else {
                response.status(200).json({
                    status: "success",
                    sales
                });
            }

        } catch(error) {
            next(error);
        }
    }, 

    async editOrderStatus (request, response, next) {
        const orderId = parseInt(request.params.orderId, 10);
        const { newStatus } = request.body; 

        try {
            const order = await updateOrderStatus(newStatus, orderId);
            order["date"] = order.date.toISOString().split('T')[0];

            if (!order) {
                next();
            } else {
                response.status(200).json({
                    status: "success",
                    order
                });
            }

        } catch(error) {
            next(error);
        }
    }
}