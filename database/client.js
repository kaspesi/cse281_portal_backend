const { Client } = require('pg');
require('dotenv').config();

console.log(`user: ${process.env.PSQL_USER}\n
host: ${process.env.PSQL_HOST}\n
database: ${process.env.PSQL_DATABASE}\n
password: ${process.env.PSQL_PASS}\n
port: ${process.env.PSQL_PORT}\n`)


const client = new Client({
	user: process.env.PSQL_USER,
	host: process.env.PSQL_HOST,
	database: process.env.PSQL_DATABASE,
	password: process.env.PSQL_PASS,
	port: process.env.PSQL_PORT,
	ssl: { rejectUnauthorized: false }
});

module.exports = client;