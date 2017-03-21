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

  db.collection('Wikis').find({
    noted : false,
    _id : new ObjectID('58a3f038fe38b811fe056b64')
  }).toArray().then((docs) => {
    console.log('Wikis are:');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=> {
    console.log('Unable to fetch wikis ',err);
  });

  db.collection('Wikis').find().count().then((count) => {
    console.log(`Wikis are: ${count}`);
  },(err)=> {
    console.log('Unable to fetch wikis ',err);
  });

  db.collection('Users').find({name : 'Test'}).toArray().then((data) => {
    console.log('users are: ');
    console.log(JSON.stringify(data,undefined,2));
  },(err) => {
    console.log('Unable to fetch Users ',err);
  })
    //db.close();
});
