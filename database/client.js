const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
	user: '',
	host: '',
	database: '',
	password: '',
	port: 5432,
	ssl: { rejectUnauthorized: false }
});

module.exports = client;