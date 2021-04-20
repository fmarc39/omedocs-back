require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();

// CORS 
app.use(cors({
    // Permet à l'addresse donnée de pouvoir accéder à l'API
    origin: 'http://localhost:8080',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled server running on :', process.env.PORT);
});