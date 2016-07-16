

module.exports = function(next, User){

   var db =  this.getDB();
   var bcrypt = this.getPackage('bcryptjs');
   var reqbody = this.getRequestProp('body');
   var _self = this;
   var err = null;

   User.findOne({ email : reqbody.email }, '+password', function(error, user){
            if(error){
               return next(error);
            }
            
            if(!user){
               err =  new Error('Incorrect email');
               err.status = 401;
               return next(err);
            }

            bcrypt.compare(reqbody.password,  user.password, function(err, isMatch){
                if(!isMatch){
                     err =  new Error('Incorrect Password or Username');
                     err.status = 401;
                     return next(err);
                }

                user = user.toObject();
                delete user.password;

                var token = createToken(user);
                _self.getResponse().send({ token: token, user: user });
                _self.terminateControl();
            });
   });
   
}