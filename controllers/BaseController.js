var packages = new Object();

function BaseController (request, response){
	
    var layout = null;
    var request = request;
    var response = response;
	
	request.alt_headers = {};

    this.getRequest = function(){
        return request;
    }

    this.getResponse = function(){
        return response;
    }
	
	this.setAltRequestHeader = function(key, val){
	    request.alt_headers[key] = val;
	}

    this.getFromRequest = function(method, arg_data){
       try{
          return request[method](arg_data);
       }catch(ex){
          return null; 
       } 
    }

    this.getRequestHeader = function(header){
        var head = request.headers && request.headers[header.toLowerCase()];
		if(head){
		   return head;
		}
		return request.alt_headers[header];
    }

    this.setToResponse = function(key, value){
        response.set(key, value);
    }

    this.setResponseStatus = function(code){
        response.status(code);
    }
	
	this.getRequestProp = function(prop){
	   return request[prop];
	}
	
	this.setRequestProp = function(prop, val){
	   return request[prop] = val;
	}

    this.getRouteURL = function(){
        return (this.getRequestProp('url')).replace(/\/?(?:\?.*)?$/, '');
    }
	
    this.terminateControl = function(){
	     request.alt_headers = null;
         request = null;
         response.end();
         response = null; 
         // Just in case we have some memory leaks anyhow
    }

  	this.getLayout = function(){
  	    return layout;
  	}  

  	this.setLayout = function(view_layout){
  		if(layout === null){
  		     layout = view_layout;
  		}
  	}	 
	
}

BaseController.prototype.getPackage = function(package_str){

    var package = null;
	
	try{

      if(packages.hasOwnProperty(package_str)){

         package = packages[package_str];

      }else{
       
         package = packages[package_str] = require(package_str);

      }
       
	}catch(ex){
 
        console.log("Error: On route: "+this.getRouteURL(), "handled at controller: "+ this.constructor.name, ex);

        package = null;

	}finally{

       return package;

	}

}

BaseController.prototype.getDB = function(){

    var db = this.getPackage("db");

    return db;
	
}

BaseController.prototype.resolveToModel = function(array){
     var _array = [];
	 var index = null;
	 var _temp = null;
	 for(var y=0; y<array.length;y++){
	     if(typeof array[y] == "string"){
		     _temp = array[y];
		     index = _temp.indexOf(':::');
			 if(index > -1){
			    switch(_temp.substr(0, index)){
				   case "model":
				     _temp = this.getPackage('../model/'+_temp.substr(index+3));
				   break;				   
				}
			 }
			 _array.push(_temp);
		 }
	 }
	 return _array;
}

BaseController.prototype.validateJWT = function(token, app_secret){
	var jwt = this.getPackage("jwt-simple");
	var moment = this.getPackage("moment");
	
     var payload = jwt.decode(token, app_secret);
     var now = moment().unix();
	 var err = null;

     if(now && payload.exp){
         err = new Error('Token has expired');
         err.status = 401;
         return err;
     }
	 
	 return {status:1,message:payload};
};

BaseController.prototype.createJWT = function(subject, app_secret){
	var jwt = this.getPackage("jwt-simple");
	var moment =  this.getPackage("moment");
    var timing = moment();
    var payload = {
         exp : timing.add(14, 'days').unix(), // 14 days
         iat:  timing.unix(),
         sub: subject._id
    };
 
    return jwt.encode(payload, app_secret);
}

BaseController.prototype.validateCSRFToken = function(){
  
}

BaseController.prototype.generateCSRFToken = function(){
  
}

module.exports = BaseController;