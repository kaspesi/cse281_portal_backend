const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
	user: 'igonyfvwvdafir',
	host: 'ec2-34-192-122-0.compute-1.amazonaws.com',
	database: 'd3al9v8lhdukc',
	password: 'ba2c060d39ea7ef7aad3b56cce7584dbab365a8ecf6c4e6e0e59143c5b62ac95',
	port: 5432,
	ssl: { rejectUnauthorized: false }
});

module.exports = client;