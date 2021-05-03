// On importe les fonctions du fichier orderDataMapper
const { selectOrderNumbers, insertOrder, insert_order_product_relation, selectOrders } = require('../dataMappers/orderDataMapper');
// On récupère la librarie 'randomstring' qui crée une chaîne de caractères aléatoire
const randomstring = require('randomstring');

// On export notre fonction
module.exports =  {
    // Récupère et renvoit sous format JSON les informations de la commande
    async createOrder (request, response, next) {
        // 
        const buyerId = parseInt(request.params.userId, 10);
        const { price, pharmacyname, productid, quantityToBuy } = request.body;
        
        const generateString = randomstring.generate(17);

        try {
            const orderNumbers = await selectOrderNumbers();

            if (orderNumbers) {
                for (let orderNumber of orderNumbers) {
                    const value = orderNumber.order_number;
                    console.log(value);

                    if (value == generateString) {
                        generateString = randomstring.generate(17);
                    }
                }
            };

            const newOrder = await insertOrder(generateString, price, pharmacyname, buyerId);
            const order_product_relation = await insert_order_product_relation(productid, newOrder.id, quantityToBuy);

            response.status(200).json({ 
                status: "success",
                newOrder, 
                order_product_relation
            }); 
        } catch(error) {
            next(error);
        }
    },
 
    async getOrders (request, response, next) {
        const userId = parseInt(request.params.userId, 10);

        try {
            const orders = await selectOrders(userId);

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