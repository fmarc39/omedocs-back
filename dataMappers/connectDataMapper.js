const client = require('./client'); 

module.exports = {
    async insertUser(userType, establishment, rpps, finess, adeli, email, password, phoneNumber, address, city, region, zipCode) {
        const result = await client.query(`
            SELECT createUser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [userType, establishment, rpps, finess, adeli, email, password, phoneNumber, address, city, region, zipCode]
        );

        console.log('result insert user : ', result.rows);
        return result.rows;
    },
}