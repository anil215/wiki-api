const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// THE THING BELOW IS ALREADY IMPLEMENTED AS JWT
//
// var message = 'i am user number 5';
// var hash = SHA256(message).toString();
//

// CREATING THE TOKEN
// var data = {
//   id: 4
// };
// var token = {
//   data: data,
//   hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // if a man in middle tries to alter the token we provided
// // the salt is stored on server and the man in middle does not have access to it
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//

// VERIFYING THE TOKEN
// if(resultHash === token.hash){
//   console.log('DATA WAS NOT CHANGED');
// } else {
//   console.log('DATA WAS CHANGED . DO NOT TRUST')
// }

var data = {
  id:10
}
var token = jwt.sign(data,'secret'); // value sent to user when they ign up or login
console.log(token);

var decoded = jwt.verify(token,'secret');
console.log(decoded);
