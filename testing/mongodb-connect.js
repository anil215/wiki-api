const {MongoClient} = require('mongodb');
const wikipedia = require("wikipedia-js");
var htmlToText = require('html-to-text');

var populate = (name,callback) => {
  var query = name;
  var options = {query: query, format: "html", summaryOnly: true, lang: "en"};
  var ret = {};
  wikipedia.searchArticle(options, (err, htmlWikiText) =>{
    ret.name = query;
    ret.noted = false;
    if(err){
      ret.data = 'No details found !!';
    } else {
        ret.data = htmlToText.fromString(htmlWikiText,{
          wordwrap: 130
        });
    }
    callback(ret);
  });
};

MongoClient.connect('mongodb://localhost:27017/WikiApp',(err,db) => {
  if(err){
    console.log('Unable to connect to MongoDb server');
    return;
  }
  console.log('Connected to MongoDB server');

  populate('aaaa',(res) => {

    db.collection('Wikis').insertOne(res,(err,result)=> {
      if(err){
        return console.log('Unable to insert wiki ',err);
      }
      console.log(JSON.stringify(result.ops,undefined,2));
    });

    db.collection('Users').insertOne({
      name : 'Anil',
      age : 25,
      location : 'Ranchi'
    },(err,result) => {
      if(err){
        return console.log('Unable to insert User ',arr);
      }
      console.log(result.ops);
    });
    db.close();
  });

});
