-- Revert omedocs:05-view-count from pg

BEGIN;

DROP VIEW count_users_and_products;

COMMIT;
