// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les données des utilisateurs
    async findUsers(id) {
        const result = await client.query(`
            SELECT *
                FROM "user"
                    WHERE id=$1`,
                    [id]
        );

        // Renvoit ces données 
        return result.rows[0];
    }
}
