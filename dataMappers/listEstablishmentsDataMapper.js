const client = require('./client'); 

// On export les fonctions
module.exports = {

    async findEstablishments(value, region) {

        if(region === 'Toute les régions') {
            region = ""
        };

        const result = await client.query(`
            SELECT *
           FROM "user"
             
            WHERE establishment ILIKE $1
            AND region ILIKE $2
            `,
            [`${value}%`,`${region}%` ]
        );

        // Renvoit ces données 
        return result.rows;
    },

}

