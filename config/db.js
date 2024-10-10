const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
});

client.connect()
.then(() =>
    console.log('Database connected'))
.catch(err => console.error(err));

module.exports = client;