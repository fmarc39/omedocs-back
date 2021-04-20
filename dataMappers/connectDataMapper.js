const client = require('./client'); 

module.exports = {
    async insertUser(user_type, establishment, rpps, finess, adeli, email, hashed_password, phone_number, address, city, region, zip_code) {
        const result = await client.query(`
            INSERT INTO "user" (user_type, establishment, rpps, finess, adeli, email, password, phone_number, address, city, region, zip_code)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [user_type, establishment, rpps, finess, adeli, email, hashed_password, phone_number, address, city, region, zip_code]
        );

        return result.rows;
    },

    async findUserByEmail(email) {
        const result = await client.query(`
            SELECT *
            FROM "user"
            WHERE email=$1`,
            [email]
        );

        return result.rows;
    },
}
