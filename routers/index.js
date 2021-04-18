const express = require('express');

const connectRouter = require('./connectRouter');

const router = express.Router();

router.use(connectRouter);

module.exports = router;