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
