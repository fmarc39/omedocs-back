// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {

     async insertProduct(name, expiration_date, number_of_boxes, quantity_in_box, mass, volume, unit_price, composition, dosage_form, cis_code, user_id) {
         const result = await client.query(`
            INSERT INTO product (name, expiration_date, number_of_boxes, quantity_in_box, mass, volume, unit_price, composition, dosage_form, cis_code, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [name, expiration_date, number_of_boxes, quantity_in_box, mass, volume, unit_price, composition, dosage_form, cis_code, user_id]
            );
            
            // Renvoit ces données 
            return result.rows;
     },
}