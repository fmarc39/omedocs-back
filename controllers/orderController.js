// On importe les fonctions du fichier editInventoryDataMapper
const { selectOrderNumbers, insertOrder, insertOrderProductRelation, selectOrders } = require('../dataMappers/orderDataMapper');
// On récupère la librairie 'randomstring' qui nous crée une chaîne de caractères aléatoire
const randomstring = require('randomstring');

// On export nos fonctions
module.exports = {
    // 
    async createOrder (request, response, next) {
        let generateNumber = randomstring.generate({ length: 17 });

        const { price, pharmacyname, hospitalid, productid, quantityToBuy } = request.body;

        try  {
            const orderNumbers = await selectOrderNumbers();

            if (orderNumbers) {
                for (let number of orderNumbers) {
                    console.log('number :', number);

                    const obj = Object.values(number);
                    const value = obj[0];

                    if (value === generateNumber) {
                        generateNumber = randomstring.generate({ length: 17 });
                    };
                };  
            }
                
            const newOrder = await insertOrder(generateNumber, price, pharmacyname, hospitalid);
            const newLink = await insertOrderProductRelation(productid, newOrder.id, quantityToBuy);

            response.status(200).json({ newOrder, newLink });
                
            /* if (!orderNumbers) {
                const newOrder = await insertOrder(generateNumber, price, pharmacyname, hospitalid);
                const newLink = await insertOrderProductRelation(productid, newOrder.id, quantityToBuy);

                response.status(200).json({ newOrder, newLink });
            } else {
                for (let number of orderNumbers) {
                    console.log('number :', number);

                    const obj = Object.values(number);
                    const value = obj[0];

                    if (value === generateNumber) {
                        generateNumber = randomstring.generate({ length: 17 });
                    };
                };  
            
                const newOrder = await insertOrder(generateNumber, price, pharmacyname, hospitalid);
                const newOrderProductRelation = await insertOrderProductRelation(productid, newOrder.id, quantityToBuy);

                response.status(200).json({ newOrder, newOrderProductRelation });
            } */
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch(error) {
            next(error);
        }
    }, 

    async getOrders (request, response, next) {
        const userId = request.params.id;
=======
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
        const { userId } = request.params;
>>>>>>> order

        try {
            const orders = await selectOrders(userId);

            if (!orders) {
<<<<<<< HEAD
                next()
            } else {
                response.status(200).json({ 
                    status: "success",
                    orders 
                }); 
            }
=======
                next();
            } else {
                response.status(200).json({ 
                    status: "success",
                    orders
                });
            }

>>>>>>> order
        } catch(error) {
            next(error);
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> order
