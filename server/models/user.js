const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// schema for users
var UserSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
    minlength : 1,
    trim : true,
    unique: true,
    validate : {
      validator : (value) => {
        return validator.isEmail(value);
      },
      message : '{VALUE} is not a valid email'
    }
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  },
  tokens: [{
    access : {
      type : String,
      required : true
    },
    token: {
      type : String,
      required : true
    }
  }]
});

// instance methods
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access : access},'abc123').toString();

 // whenver the user uses a new device we basically store it in tokens array for that user
  user.tokens.push({
    access:access,
    token:token
  });

  // when the document is updated this returns a promise and on success we return the token to server.js
  // and the token is return to the caller that is server.js
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.toJSON = function() {
  // funtion to limit the conents which is returned to the user
  var user = this;
  var userObject = user.toObject();// converts the mongo db object to regular object

  return _.pick(userObject,['_id','email']);
}

var User = mongoose.model('User',UserSchema);


module.exports = {
  User : User
};