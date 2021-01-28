const rp = require('request-promise');
const $ = require('cheerio');



//Collect all new URLS from coindesk
//For each URL request page, parse title, article, time, last update, 
function coindesk() {
    let url = 'https://www.coindesk.com/category/markets'

    rp(url)
    .then(function(html){
        //success!
        // console.log($('big > a', html).length);
        // console.log($('big > a', html));
        let siteHTML = $.load(html);
        let titlesArray = []
        console.log("Looking for articles");
        siteHTML(".article-card-fh").each(function(i, element) {
            var result = {};

            result.title = siteHTML(this).children(".text-group").text();
            result.link = siteHTML(this).children(".text-group").children(".card-text-block")
            .children(".heading").children("a").attr("href");
            console.log(`Title: ${result.title}`)
            console.log(`Link: ${result.link}\n`)
        })

        siteHTML(".list-item-card").each(function(i, element) {
            var result = {};

            result.title = siteHTML(this).find(".heading").text();
            result.link = siteHTML(this).find(".text-content").children("a").last().attr("href")
            result.time = siteHTML(this).find(".time").text();
            console.log(`Title: ${result.title}`)
            console.log(`Time: ${result.time}`)
            console.log(`Link: ${result.link}\n`)
        })


    })
    .catch(function(err){
        console.log("Error: " + err);
    })
}

module.exports.coindesk = coindesk;