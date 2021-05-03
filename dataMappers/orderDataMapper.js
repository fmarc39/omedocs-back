const client = require('./client');

module.exports = {
    async selectOrderNumbers() {
        const result = await client.query(`
            SELECT order_number
                FROM "order"`
        );

        return result.rows;
    },

    async insertOrder(orderNumber, totalCost, buyerId, sellerId) {
        const result = await client.query(`
            INSERT INTO "order" (order_number, total_cost, buyer_id, seller_id)
                VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [orderNumber, totalCost, buyerId, sellerId]
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