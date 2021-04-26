-- Deploy omedocs:05-function-listProductsByName to pg

BEGIN;

ALTER TABLE product
    ADD COLUMN users TYPE TEXT[];*$

INSERT INTO product (users)
    VALUES ( SELECT * FROM "user" WHERE "user".id = product.user_id )
RETURNING *

CREATE FUNCTION productsByName (name TEXT) RETURNS product AS
$$
    SELECT product.name, product.users, (SELECT * FROM "user" /* JOIN product ON product.users = "user".id */)
        FROM product 
    /*
    JOIN "user"
        ON "user".id = product.users
    */
    WHERE product.name ILIKE $1
    
$$
LANGUAGE sql STABLE STRICT;

ALTER TABLE product
    RENAME COLUMN users TO user_id;

COMMIT;
