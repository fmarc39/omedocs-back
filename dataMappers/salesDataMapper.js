// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les données de
    async findSales(user_id) {
        const result = await client.query(`
            SELECT *
                FROM "order" 
                    WHERE seller_id = $1`,
                    [user_id]
        );
 
        // Renvoit ces données 
        return result.rows;
    },

    // Insère et sélectionne (avec "RETURNING") les données du médicament ajouté par un vendeur dans la base de données 
    async updateOrderStatus(status, id) {
        const result = await client.query(`
            UPDATE "order"
                SET status=$1
                    WHERE id=$2
            RETURNING *`,
            [status, id]
        );

        return result.rows[0];
    }
}