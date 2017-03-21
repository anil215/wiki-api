var mongoose = require('mongoose');


mongoose.Promise = global.Promise;// set mongoose to use promises
mongoose.connect('mongodb://localhost:27017/WikiApp');


module.exports = {
  mongoose : mongoose
}
