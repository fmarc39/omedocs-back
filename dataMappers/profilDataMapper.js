// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Met à jour et sélectionne (avec "RETURNING") le profil  modifié de l'utilisateur
    async updateProfil(email, id) {
        const result = await client.query(`
            UPDATE "user"
                SET email=$1
                    WHERE id=$2
            RETURNING *`,
            [email, id]
        );

        // Renvoit ces données 
        return result.rows;
    },

    // Met à jour et sélectionne (avec "RETURNING") le profil  modifié de l'utilisateur
    async updateProfil(phoneNumber, id) {
        const result = await client.query(`
            UPDATE "user"
                SET phone_number=$1
                    WHERE id=$2
            RETURNING *`,
            [phoneNumber, id]
        );

        // Renvoit ces données 
        return result.rows;
    }
}
