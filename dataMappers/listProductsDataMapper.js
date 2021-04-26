// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    
    async findProductsByName(name) {
        console.log(name);

        const result = await client.query(`
            SELECT *
                FROM "user"
            JOIN product
                ON product.user_id = "user".id
            WHERE product.name ILIKE $1`,
            [`${name}%`]
        );

        // Renvoit ces données 
        return result.rows;
    },

  async findProductsByCis(cis) {
        console.log(cis);

        const result = await client.query(`
            SELECT *
                FROM "user"
            JOIN product
                ON product.user_id = "user".id
            WHERE product.cis_code ILIKE $1`,
            [`${cis}%`]
        );

        // Renvoit ces données 
        return result.rows;
    }

}

