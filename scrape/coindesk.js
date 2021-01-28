const rp = require('request-promise');
const cheerio = require('cheerio');
const colors = require('colors');
const Sentiment = require('./sentiment')
const leftURL = 'https://www.coindesk.com/wp-json/v1/articles/category/markets/'
const rightURL = '?mode=list'

//Collect all new URLS from coindesk
//For each URL request page, parse title, article, time, last update, 
async function coindesk(numPages) {

    let i
    for(i = 1; i < numPages+1; i++){
        let url = leftURL + i + rightURL
        console.log(`URL: ${url}`)

        let response = await rp(url)
        response = JSON.parse(response);
        // console.log(response);
        let posts = response.posts;
        await Promise.all(posts.map(async (post) => {
            let title = post.title
            let date = post.date
            let articleURL = `https://www.coindesk.com/${post.slug}`
            let text = post.text
            let articleHTML = await rp(articleURL)
            const $ = cheerio.load(articleHTML)
            let aText = $(".article-pharagraph").text()
            let aList = $(".article-list").text();

            let [analysis,keywords] = await Sentiment.sentiment(aText);


            console.log(`Title: ${title.cyan}\nDate: ${date}\nURL: ${articleURL}`);
            console.log("Keywords: " + keywords)
            if(analysis >= 0) console.log("Sentiment: " + analysis.toString().green+ "\n")
            else console.log("Sentiment: " + analysis.toString().red+ "\n")

        }))
    }
}

module.exports.coindesk = coindesk;