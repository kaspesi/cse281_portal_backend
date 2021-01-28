const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.coindesk.com/'
const sites = require("./coindesk");

function startScraping() {
    console.log("started scraping");

    sites.coindesk(1);


    

}


module.exports.startScraping = startScraping;