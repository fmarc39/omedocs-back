<<<<<<< HEAD
// Récupère le pool de clients PostgreSQL
const client = require('./client');

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les numéros de commande
=======
const client = require('./client');

module.exports = {
>>>>>>> order
    async selectOrderNumbers() {
        const result = await client.query(`
            SELECT order_number
                FROM "order"`
        );

<<<<<<< HEAD
        // S'il n'y en a pas, on revoit "undefined"
        if (result.rowCount === 0 ) {
            return undefined;
        };

        // Renvoit ces données
        return result.rows;
    },

    // Insère et sélectionne (avec "RETURNING") les données de la nouvelle commande
    async insertOrder(orderNumber, price, pharmacy_name, hospital_id) {
        const result = await client.query(`
            INSERT INTO "order" (order_number, total_cost, seller_name, buyer_id)
                VALUES ($1, $2, $3, $4)
            RETURNING *`,   
            [orderNumber, price, pharmacy_name, hospital_id]   
        );

        // Renvoit ces données
        return result.rows[0];
    },

    // Insère et sélectionne (avec "RETURNING") les données reliant une commande à un produit et sa quantité achetée
    async insertOrderProductRelation(product_id, order_id, quantityToBuy) {
        const result = await client.query(`
            INSERT INTO product_has_order (product_id, order_id, quantity_bought)
                VALUES ($1, $2, $3)
            RETURNING *`,
            [product_id, order_id, quantityToBuy]       
        );

        // Renvoit ces données
        return result.rows[0];
    },

    // Sélectionne depuis la bdd les données des commandes de l'utilisateur
    async selectOrders(buyer_id) {
=======
        return result.rows;
    },

    async insertOrder(orderNumber, totalCost, pharmacyName, buyerId) {
        const result = await client.query(`
            INSERT INTO "order" (order_number, total_cost, pharmacy_name, buyer_id)
                VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [orderNumber, totalCost, pharmacyName, buyerId]
        );

        return result.rows[0];
    },

    async insert_order_product_relation(productId, orderId, quantityToBuy) {
        const result = await client.query(`
            INSERT INTO product_has_order
                VALUES ($1, $2, $3)
            RETURNING *`,
            [productId, orderId, quantityToBuy]
        );

        return result.rows[0];
    },

    async selectOrders(buyerId) {
>>>>>>> order
        const result = await client.query(`
            SELECT * 
                FROM "order"
                    WHERE buyer_id=$1`,
<<<<<<< HEAD
                    [buyer_id]
        );

        // Renvoit ces données
=======
            [buyerId]
        );

>>>>>>> order
        return result.rows;
    }
}