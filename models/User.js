var mongoose = require('db');

var User = mongoose.model('User', new mongoose.Schema({
   instagramId : { type: String, index: true },
   facebookId : { type: String, index :true},
   googleId : { type: String, index :true},
   twitterId : { type: String, index :true},
   email : { type : String , unique : true, lowercase : true },
   password: { type : String , select : false },
   mobile : { type : Number , unique : true},
   username : String ,
   fullName : String ,
   picture : String ,
   accessToken : String

}));

module.exports = exports = User;