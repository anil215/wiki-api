// body parser is used to send data to the server
// takes a string body and turns it into javascript object
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {populate} = require('./wikipedia.js');
const {Wiki} = require('./models/wiki.js');
const {User} = require('./models/user.js');
const {authenticate} = require('./middleware/authenticate.js');

var app = express();

app.use(bodyParser.json());

app.post('/wikis',authenticate,(req,res) => {
  var name = req.body.name;

  populate(name,(e,data) => {
    if(e){
      return res.status(400).send(e);
    }

    var newWiki = new Wiki({
      name : name,
      noted : false,
      data : data,
      completedAt : 123,
      _creater: req.user._id
    });

    newWiki.save().then((data) => {
      res.send(data);
    },(err) => {
      res.status(400).send('Error occured ',err);
    });

  });

});


app.get('/wikis',authenticate,(req,res) => {
  Wiki.find({
    _creater:req.user._id
  }).then((wikis) => {
    res.send({wikis});
  },(err) => {
    res.status(400).send(err);
  });
});

app.get('/wikis/:id',authenticate, (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Wiki.findOne({
    _id:id,
    _creater:req.user._id
  }).then( (wiki) => {
    if(!wiki){
      return res.status(404).send();
    }
    res.send({wiki:wiki});
  }).catch( (err) => {
    res.status(400).send();
  });
});

app.delete('/wikis/:id',authenticate,(req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Wiki.findOneAndRemove({
    _id:id,
    _creater:req.user._id
  }).then((wiki) => {
    if(!wiki){
      return res.status(404).send();
    }
    res.send({wiki:wiki});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.patch('/wikis/:id',authenticate,(req,res) => {
  var id = req.params.id;
  // an array of properties to be picked from req.body
  var body = _.pick(req.body,['noted']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.noted) && body.noted){
    body.completedAt = new Date().getTime();
  } else {
    body.noted = false;
    body.completedAt = null;
  }


  Wiki.findOneAndUpdate({
    _id:id,
    _creater:req.user._id
  },{
    $set : body
  },{
    new : true
  }).then((wiki) => {
    if(!wiki){
      return res.status(404).send();
    }
    res.send({wiki:wiki});
  }).catch((err) => {
    res.status(400).send(err);
  });

});

// POST /users
app.post('/users', (req,res) => {

  var what = _.pick(req.body,['email','password']);

  var entity = new User(what);

// this data parameter is passed by the mongodb database when it returns the promise
// and we are using the instance method created to assign the token
  entity.save().then((data) => {
    return entity.generateAuthToken(); // the function returns the hashed token and using return once agin we are chaining thepromise
  }).then((token) => {
    // custom header x-auth , the token argument which is hashed value of id
    res.header('x-auth', token).send(entity);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

// POST /users/login (emai,password)
app.post('/users/login',(req,res) => {
  var body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});


// GET /users/me
app.get('/users/me',authenticate, (req,res) => {
  res.send(req.user);
});

// DELETE /users/me/token
app.delete('/users/me/token',authenticate,(req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  },() => {
    res.status(400).send();
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = {
  app : app
};
