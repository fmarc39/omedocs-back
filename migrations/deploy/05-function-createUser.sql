-- Deploy omedocs:05-function-createUser to pg

BEGIN;

CREATE FUNCTION createUser(userType TEXT, establishment TEXT, rpps BIGINT, finess BIGINT, adeli BIGINT, email TEXT, password TEXT, 
    phoneNumber INT, address TEXT, city TEXT, region TEXT, zipCode INT) RETURNS "user" AS
$$
    INSERT INTO "user" (userType, establishment, rpps, finess, adeli, email, password, 
        phoneNumber, address, city, region, zipCode)

        VALUES (userType, establishment, rpps, finess, adeli, email, password, phoneNumber, address, city, region, zipCode)
        
        RETURNING *;
$$
LANGUAGE sql VOLATILE STRICT;

COMMIT;
