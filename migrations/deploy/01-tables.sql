-- Deploy omedocs:tables-01 to pg

BEGIN;

CREATE TABLE pathology (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_type TEXT NOT NULL,
    establishment TEXT NOT NULL,
    rpps TEXT NULL, 
    finess TEXT NULL, 
    adeli TEXT NULL, 
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL, 
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    zip_code TEXT NOT NULL
);

CREATE TABLE product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name TEXT NOT NULL,
    expiration_date TEXT NOT NULL,
    number_of_boxes TEXT NOT NULL, 
    quantity_in_box TEXT NULL,
    mass TEXT NULL,
    volume TEXT NULL,
    unit_price TEXT NOT NULL, 
    composition TEXT NOT NULL,
    dosage_form TEXT NOT NULL,
    cis_code TEXT NOT NULL,
    user_id INT REFERENCES "user"(id),
    pathology_id INT REFERENCES pathology(id)
);

CREATE TABLE "order" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number TEXT NOT NULL, 
    status TEXT NOT NULL,
    date TIMESTAMPTZ,
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE notification (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message TEXT NOT NULL, 
    date TIMESTAMPTZ,
    order_id INT REFERENCES "order"(id),
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE product_has_order (
    product_id INT REFERENCES product(id),
    order_id INT REFERENCES "order"(id)
);

COMMIT;
