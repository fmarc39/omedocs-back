// Récupère le pool de clients PostgreSQL
const client = require('./client');

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les numéros de commande
    async selectOrderNumbers() {
        const result = await client.query(`
            SELECT order_number
                FROM "order"`
        );

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
        const result = await client.query(`
            SELECT * 
                FROM "order"
                    WHERE buyer_id=$1`,
                    [buyer_id]
        );

        // Renvoit ces données
        return result.rows;
    }
}