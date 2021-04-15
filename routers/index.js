const express = require('express');

const connectRouter = require('./initRouter');

const router = express.Router();

router.use(connectRouter);

module.exports = router;