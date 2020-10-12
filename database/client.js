const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
	user: 'nrbloanjmxkvvt',
	host: 'ec2-54-146-4-66.compute-1.amazonaws.com',
	database: 'd9ueho8h3lvd2v',
	password: '5d2e820131c28454e8b997afff24e7c2e6a545d0bb04cb7a8329bec6624df3ac',
	port: 5432,
	ssl: { rejectUnauthorized: false }
});

module.exports = client;