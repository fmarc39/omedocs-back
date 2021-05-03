// On importe les fonctions du fichier orderDataMapper
const { selectOrderNumbers, insertOrder, selectOrders } = require('../dataMappers/orderDataMapper');
// On récupère la librarie 'randomstring' qui crée une chaîne de caractères aléatoire
const randomstring = require('randomstring');

// On export notre fonction
module.exports =  {
    // Récupère et renvoit sous format JSON les informations de la commande
    async createOrder (request, response, next) {
        // 
        const buyerId = parseInt(request.params.userId, 10);
        const { total_cost, pharmacyid } = request.body;
        
        const generateString = randomstring.generate(17);

        try {
            const orderNumbers = await selectOrderNumbers();

            if (orderNumbers) {
                for (let orderNumber of orderNumbers) {
                    const value = orderNumber.order_number;

                    if (value == generateString) {
                        generateString = randomstring.generate(17);
                    }
                }
            };

            const newOrder = await insertOrder(generateString, total_cost, buyerId, pharmacyid);
            newOrder["date"] = newOrder.date.toISOString().split('T')[0];

            response.status(200).json({ 
                status: "success",
                newOrder
            }); 
        } catch(error) {
            next(error);
        }
    },
 
    async getOrders (request, response, next) {
        const userId = parseInt(request.params.userId, 10);

        try {
            const orders = await selectOrders(userId);

            for (let order of orders) {
                order["date"] = order.date.toISOString().split('T')[0];
            };

            if (!orders) {
                next()
            } else {
                response.status(200).json({ 
                    status: "success",
                    orders 
                }); 
            }
        } catch(error) {
            next(error);
        }
    }
}
