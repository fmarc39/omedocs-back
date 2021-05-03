const client = require('./client');

module.exports = {
    async selectOrderNumbers() {
        const result = await client.query(`
            SELECT order_number
                FROM "order"`
        );

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
        const result = await client.query(`
            SELECT * 
                FROM "order"
                    WHERE buyer_id=$1`,
            [buyerId]
        );

        return result.rows;
    }
}