var httpService = require('./bootstrap');
var paramware = require("./middlewares/params.js");
var logger = require('morgan');
var routes = require('./routes');

module.exports = exports = httpService;

exports.listener = function(){
    console.log("----> Express listening on port "+httpService.get('port'));
}

// Enable CORS on the server using middleware
httpService.use(require("./middlewares/crossdomain.js").component);
// Enable **global** access to param processing results using middleware
httpService.param('role', paramware.role);
httpService.param('oauthprovider', paramware.oauthprovider);


// Setup basic application routes --- These will always return Jade Views (laden with AngularJS expressions and directives)
httpService.get('/:role/dashboard', routes.filter.verify, routes.index.admin);
httpService.get('/', routes.index.site);

httpService.post('/api/service/:role/signin', routes.filter.verify, routes.auth.signin); // :role must be 'user'
httpService.post('/api/service/:role/signup', routes.filter.verify, routes.auth.signup); // :role must be 'user'



httpService.get('/api/service/exchange/:oauthprovider', routes.filter.oauthify, routes.auth.passthru); //  

// MouthPath for middleware -- not yet needed
/*
httpService.use('/debug', require('./debug.js'));
*/

if('development' == httpService.get('env')){
   /*app.use(express.errorHandler({
      dumpExceptions:true,
      showStack:true
   }));*/
   app.use(logger('dev'));
   
   httpService.use(function(err, req, res, next){
      var stat = err.status || 400;
      if(err.isPage){
          res.status(stat).render('error', {
             message:err.message,
             error:err
          })
      }else{
        res.status(stat).json({
           status:"ERROR",
           error:err.message,
           details:(err.flagged && err.flagged.split(' ') || [])
        });
      }
   });
}

// production error handler
// no stack traces leaked to the user for security purposes !!!
httpService.use(function(err, req, res, next){
      var stat = err.status || 400;
      if(err.isPage){
          res.status(stat).render('error', {
             message:err.message
          });
      }else{
        res.status(stat).json({
           status:"ERROR",
           error:err.message,
           details:(err.flagged && err.flagged.split(' ') || [])
        });
      }
});


