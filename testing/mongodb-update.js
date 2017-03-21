const {MongoClient , ObjectID} = require('mongodb');
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

  db.collection('Wikis').findOneAndUpdate({
    _id : new ObjectID("58a3efcf5e417611e63dbd1e")
  },{
    // here update commands goes
    $set: {
      noted : true
    }
  },{
    // here customisabe options
    returnOriginal : false
  }).then((result) => {
    console.log(result);
  },(err) => {
    console.log('Error Occured ',err);
  });

  db.collection('Users').findOneAndUpdate({
    _id : new ObjectID("58a3f0ecb838fb134fff0228")
  },{
    $set:{
      name : 'Coder'
    },$inc:{
      age : +2
    }
  },{
    returnOriginal : false
  }).then((result) => {
    console.log(result);
  },(err) => {
    console.log('Error occured ',err);
  });
    //db.close();
});
