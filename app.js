require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();

// A éditer
app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});