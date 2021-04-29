// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    async updateProfil(id, user_type, establishment, rpps, finess, adeli, email, hashed_password, phone_number, address, city, region, zip_code) {
        const result = client.query(`
            UPDATE "user"
                SET user_type=$1, establishment=$2, rpps=$3, finess=$4, adeli=$5, email=$6, password=$7, phone_number=$8, address=$9, 
                    city=$10, region=$11, zip_code=$12
                WHERE id=$13
            RETURNING *`,
            [id, user_type, establishment, rpps, finess, adeli, email, hashed_password, phone_number, address, city, region, zip_code]
        );

        // Renvoit ces données 
        return result.rows;
    }
}