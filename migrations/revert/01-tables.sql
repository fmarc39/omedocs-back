-- Revert omedocs:tables-01 from pg

BEGIN;

-- Supprime les tables 
DROP TABLE pathology, "user", product, "order", notification, product_has_order;

COMMIT;
