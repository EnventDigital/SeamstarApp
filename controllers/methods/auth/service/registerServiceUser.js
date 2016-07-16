

module.exports = function(next, User){

    var db =  this.getDB();
    var bcrypt = this.getPackage('bcryptjs');
    var reqbody = this.getRequestProp('body');
    var _self = this;
    var err = null;

    User.findOne({ email : reqbody.email }, function(error, existingUser){
           if(error){
              return next(error);
           }

           if(existingUser){
               err = new error('Email is already taken');
               err.status = 409;
               return next(err);
           }

           var user = new User({
                email: reqbody.email,
                password: reqbody.password
           });
 
           bcrypt.genSalt(10, function(err, salt){
              bcrypt.hash(user.password, salt, function(err, hash){
			        if(err){
					   return next(err);
					}
                    user.password = hash;

                    user.save(function(){
                        var token = _self.createJWT(user, process.env.APP_SECRET);
                        _self.getResponse().send({token : token,  user : user });              
                        _self.terminateControl();
                    });
              });
            });
    });

   
}