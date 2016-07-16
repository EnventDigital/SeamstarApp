

module.exports = function(next, APP_SECRET, User){

    var db = this.getDB();
    var result = null;
    var authorize = this.getRequestHeader('Authorization');
    var err = null;
    var token = null;
    var _self = this;

     if(!authorize){
         err = new Error('You did not provide a JWT in the request');
         err.status = 400;
         return next(err);
     }
 
    token = authorize.split(' ')[1];
    result = this.validateJWT(token, APP_SECRET);

    if(result instanceof Error){
        return next(result);
    }

    User.findById(result.message.sub, function(err, user){
         if(err){
            return next(err);
         }
 
         if(!user){
            err = new Error('User no longer exists');
            err.status = 404;
            return next(err);
         }

         _self.setRequestProp('user, user);
         next();
     });
}