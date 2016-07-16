var agent = require('superagent').agent();
var cache = {};

exports.component = function(req, res, next){
    
    if((req.headers['cookie'] || "").indexOf("token_path") > -1){ // ...........
	   res.header('Access-Control-Allow-Credentials', 'true'); // enable cookies to be sent cross-domain
	}
	
    if (req.method == 'OPTIONS'){ // CORS Preflight Request!
	   if(req.headers['access-control-request-method'] // check for Preflight headers
	      && req.headers['access-control-request-headers']
		  && req.headers['origin']){
		     if(cache["urls"] && cache["urls"].length > 0){
			     console.log(req.headers['origin']+"``````!!!!!```````");
				 res.header("Access-Control-Allow-Origin", "*");
				 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				 res.header('Access-Control-Allow-Headers', 'Content-Type,X-Experience-API-Hash,X-Experience-API-Version,Authorization');
				 res.header('Access-Control-Max-Age', 1000000); // enable caching for CORS headers
				 res.status(200).end();
				 return;
			 }
			 agent
			 .get('http://accounts.synergixe.ng/organizations/all/urls') // Get all qualified origins for CORS
			  .end(function(err, _res) {
				   if(err){
					   console.error(err);
					   return;
				   }
				   console.log(_res.body);
				   cache["urls"] = JSON.parse(_res.body);
				   if(cache["urls"].length > 0){
				      console.log(req.headers['origin']+"``````!!!!!```````");
				      res.header("Access-Control-Allow-Origin", "*");
				      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				      res.header('Access-Control-Allow-Headers', 'Content-Type,X-Experience-API-Hash,X-Experience-API-Version,Authorization');
				      res.header('Access-Control-Max-Age', 1000000); // enable caching for CORS headers
				      res.status(200).end();
				   }else{
				      res.status(400).end();
				   }	  
			   });
		}else{
           res.status(200).end(); // OR 404 --- @TODO: check in official docs for CORS
	    }	  
    } else {
        next();
    }
};