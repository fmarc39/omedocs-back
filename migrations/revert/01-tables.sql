-- Revert omedocs:tables-01 from pg

BEGIN;

DROP TABLE pathology, "user", product, "order", notification, product_has_order;

COMMIT;
