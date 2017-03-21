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

  // deleteMany
  db.collection('Wikis').deleteMany({name:'aaaa'}).then((result) => {
    console.log(result);
  },(err) => {
    console.log('Error occured ',err);
  });

  // deleteOne
  db.collection('Wikis').deleteOne({name:'del'}).then((result)=> {
    console.log(result);
  },(err)=> {
    console.log('Error occured ',err);
  });

  // findOneAndDelete
  db.collection('Wikis').findOneAndDelete({name:'del'}).then((result) => {
    console.log(result);
  },(err) => {
    console.log('Error occured ',err);
  });

  // be good at this!!
  db.collection('Users').deleteMany({name:'Test'}).then((result)=> {
    console.log(result);
  },(err)=> {
    console.log('Error occured ',err);
  })

  db.collection('Users').findOneAndDelete({
    _id : new ObjectID("58a40589c63fe217f9ee1220")
  }).then((result) => {
    console.log(result);
  },(err)=> {
    console.log('Error occured ',err);
  })

    //db.close();
});
