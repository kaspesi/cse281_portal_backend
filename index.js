
//External Dependencies 
var express = require('express');
var app = express();
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs')
const cors = require('cors');

//Local Dependencies
const client = require('./database/client');
const auth = require("./middleware/auth");
const registerRouter = require('./routers/registerRouter');

const startup = require("./scrape/startScrape");
//Connect DB

client.connect();
startup.startScraping();

const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});

app.get('/', auth, function(req, res, next) {
	res.render('index', { title: 'Front Page' });
});








