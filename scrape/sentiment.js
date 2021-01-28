const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SW = require('stopword');

var retext = require('retext')
var pos = require('retext-pos')
var keywords = require('retext-keywords')
var toString = require('nlcst-to-string')

async function sentiment(document){


    const lexedDocument = aposToLexForm(document).toLowerCase().replace(/[^a-zA-Z\s]+/g, '');
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(lexedDocument);
    const filteredReview = SW.removeStopwords(tokenizedReview);

    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const analysis = analyzer.getSentiment(filteredReview);


    let keywordSet = new Set()

    // console.log(analysis)
    // console.log(lexedDocument)
    retext().use(pos).use(keywords).process(lexedDocument, done)
    
    function done(err, file){
        if(err) throw err

        file.data.keywords.forEach(function(keyword) {
            keywordSet.add(toString(keyword.matches[0].node))
        })
        

        file.data.keyphrases.forEach(function(phrase) {
            keywordSet.add(phrase.matches[0].nodes.map(stringify).join(''))
            function stringify(value) {
            return toString(value)
            }
        })
    }
    // console.log(`KeywordSet: ${new Array(...keywordSet).join(' ')}`)
    return [analysis, new Array(...keywordSet).join(' ')]

}




module.exports.sentiment = sentiment;