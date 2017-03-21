const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Wiki} = require('./../server/models/wiki.js');
const {User} = require('./../server/models/user.js');

// var id = '58a46c5f345e4ba32116cbf511111';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// mongoose is intelligent :) does automatically converts String to ObjectID
// Wiki.find({
//   _id : id
// }).then((wikis) => {
//   console.log('Wikis are ',wikis);
// });
//
// Wiki.findOne({
//   _id : id
// }).then( (wiki) => {
//   console.log('Wiki ',wiki);
// });

// Wiki.findById(id).then((wiki) => {
//   if(!wiki){
//     return console.log('ID not found');
//   }
//   console.log('Wiki by Id ',wiki);
// }).catch( (err) => {
//   console.log('Invalid ID');
// });

// REVISE WHAT YOU LEARNT

var id = '58a48693a4f42bac5df5ea01';

if(!ObjectID.isValid(id)){
  console.log('Invalid Id entered');
}

User.findById(id).then((user) => {
  if(!user){
    return console.log('Id not found in database');
  }
  console.log(user);
}).catch((err) => {
  console.log('Id not found');
});
