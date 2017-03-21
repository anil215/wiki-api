var wikipedia = require("wikipedia-js");
var htmlToText = require('html-to-text');

var populate = (query,callback) => {
//  callback('hello');
  var options = {query: query, format: "html", summaryOnly: true, lang: "en"};

  wikipedia.searchArticle(options, function(err, htmlWikiText){
    if(err){
      callback(`OOps wrong data :)`);
    }
    callback(undefined,htmlToText.fromString(`${htmlWikiText}`,{
      wordwrap :130
    }));
  });

 };


module.exports = {
  populate : populate
}
