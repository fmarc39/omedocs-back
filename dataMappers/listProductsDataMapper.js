// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {

    async findProductsByName(name) {
        console.log(name);

        const result = await client.query(`
            SELECT * 
                FROM product 
            JOIN "user"
                ON "user".id = product.user_id
            WHERE product.name ILIKE $1
            `,
            [`${name}%`]
        );

        // Renvoit ces données 
        return result.rows;
    },

  async findProductsByCis(cis) {
        const result = await client.query(`
            SELECT * 
            FROM product 
            JOIN "user"
                ON
            WHERE product.cis_code ILIKE $1'
            `,
             [`${cis}%`]
        );

        // Renvoit ces données 
        return result.rows;
    }

}

