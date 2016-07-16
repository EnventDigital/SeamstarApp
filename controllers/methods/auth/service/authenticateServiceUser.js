

module.exports = function(next, User){

   var agent = this.getPackage('superagent').agent();
   var db =  this.getDB();
   var req = this.getRequest();
   var authorized = this.getRequestHeader('Authorization');
   var _self = this;
   var err = null;

   agent
	 .post(req.providerData.accessTokenUrl) //
	  .form(
	  	  req.providerData.accessTokenUrlParams
         ).end(function(err, resp){
             //  Link User accounts
             var provider = {}, err = null;
             if(authorized){
                
                /*switch(req.providerName){
                   case "":
                }*/
                   
                provider[req.providerName+"Id"] =  resp.body.user.id;
                

                User.findOne(provider, function(err, existingUser){
                      var token = authorized.split(' ')[1];
                      var payload = (_self.validateJWT(token, process.env.APP_SECRET)).message;

                      if(payload instanceof Error){
                      	  console.log("Wahala dey ooooo...");
                      	  return next(error);
                      }

                      User.findById(payload.sub, '+password', function(err, localUser){
                          if(!localUser){
                             err = new Error('User not found.');
                             err.status = 400;
                             return next(err);
                          }

                          // Here we merge accounts
                          if(existingUser){
                              existingUser.email = localUser.email;
                              existingUser.password = localUser.password;
                              /*existingUser.mobile = localUser.mobile;
                              existingUser.username = localUser.username;
                              existingUser.fullName = localUser.fullName
                              existingUser.picture = localUser.picture;*/                           

                              localUser.remove(); 

                              existingUser.save(function() {
                                  var token = _self.createJWT(existingUser, process.env.APP_SECRET);
                                  //delete existingUser.password;
                                   _self.getResponse().json({token : token, user : existingUser});
                                   return _self.terminateControl();
                              });  
                          }else{

                              localUser[req.providerName+"Id"] = provider[req.providerName+"Id"]; 
                              localUser.username = body.user.username;
                              localUser.fullName = body.user.full_name;
                              localUser.picture = body.user.profile_picture;
                              localUSer.accessToken = body.access_token;                            
 
                              localUser.save(function(){
                                  var token = _self.createJWT(localUser, process.env.APP_SECRET);
                                  _self.getResponse().json({token : token, user : localUser});
                                  return _self.terminateControl();
                              });
                           }
                      });
                });
             } else{ // Create a new user account or return an existing one
                User.findOne(provider, function(err, existingUser){
                      if(existingUser){
                           var token = _self.createJWT(exisitingUser, process.env.APP_SECRET);
                           _self.getResponse().json({token : token, user : exisitingUser});
                           return _self.terminateControl();
                      }

                      var userDetails = {};

                      userDetails[req.providerName+"Id"] = provider[req.providerName+"Id"];
                      userDetails.username = body.user.username;
                      userDetails.fullName = body.user.full_name;
                      userDetails.picture = body.user.profile_picture;
                      userDetails.accessToken = body.access_token;  

                      var user = new User(userDetails);

                      user.save(function(){
                          var token = _self.createJWT(user, process.env.APP_SECRET);
                          _self.getResponse().json({token : token, user : user});
                          return _self.terminateControl();
                      });
                });
             }
         }); 
}