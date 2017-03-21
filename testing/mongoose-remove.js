const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Wiki} = require('./../server/models/wiki.js');
const {User} = require('./../server/models/user.js');

// Wiki.remove({}).then((result) => {
//   console.log(result);
// });

var id ='58a49d417a55015d3cf5baf2';

// returns the deleted item
Wiki.findOneAndRemove({_id:id}).then((wiki) => {
  if(!wiki){
    return console.log('Unable to fetch ID in database');
  }
  console.log(wiki);
})

Wiki.findByIdAndRemove(id).then((wiki) => {
  if(!wiki){
    return console.log('Unable to fetch id in database');
  }
  console.log(wiki);
});
