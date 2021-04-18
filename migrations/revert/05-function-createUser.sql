-- Revert omedocs:05-function-createUser from pg

BEGIN;

DROP FUNCTION createUser(TEXT, TEXT, BIGINT, BIGINT, BIGINT, TEXT, TEXT, INT, TEXT, TEXT, TEXT, INT);

COMMIT;
