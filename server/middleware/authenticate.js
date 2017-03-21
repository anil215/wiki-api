const {User} = require('./../models/user.js');

// middleware function for private routes
var authenticate = (req,res,next) => {
  var token = req.header('x-auth'); // grabbing the hashed token from request as the user has already signed up

  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {
  authenticate : authenticate
};
