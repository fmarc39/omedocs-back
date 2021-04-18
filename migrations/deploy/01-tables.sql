-- Deploy omedocs:tables-01 to pg

BEGIN;

CREATE TABLE pathology (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userType TEXT NOT NULL,
    establishment TEXT NOT NULL,
    rpps BIGINT NULL, 
    finess BIGINT NULL, 
    adeli BIGINT NULL, 
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phoneNumber INT NOT NULL, 
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    zipCode INT NOT NULL
);

CREATE TABLE product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    productName TEXT NOT NULL,
    expirationDate TEXT NOT NULL,
    quantity INT NOT NULL, 
    amountInBox INT NULL,
    mass TEXT NULL,
    volume TEXT NULL,
    unitPrice INT NOT NULL, 
    composition TEXT NOT NULL,
    dosageForm TEXT NOT NULL,
    cisCode INT NOT NULL,
    userId INT REFERENCES "user"(id),
    pathologyId INT REFERENCES pathology(id)
);

CREATE TABLE "order" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    orderNumber INT NOT NULL, 
    status TEXT NOT NULL,
    date TIMESTAMPTZ,
    userId INT REFERENCES "user"(id)
);

CREATE TABLE notification (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message TEXT NOT NULL, 
    date TIMESTAMPTZ,
    orderId INT REFERENCES "order"(id),
    userId INT REFERENCES "user"(id)
);

CREATE TABLE productHasOrder (
    productId INT REFERENCES product(id),
    orderId INT REFERENCES "order"(id)
);

COMMIT;
