// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    async countUsersAndProducts() {
        const result = await client.query(`
            SELECT COUNT(id)
                FROM "user"
            GROUP BY user_type
        `)
    }
}