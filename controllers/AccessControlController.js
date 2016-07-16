var BaseController = require("./BaseController.js");

function AccessControlController(rq, rs){
	
	BaseController.call(this, rq, rs);
	
	return this;
}

AccessControlController.prototype = Object.create(BaseController.prototype, {});
AccessControlController.prototype.constructor = AccessControlController;

AccessControlController.prototype.verifyAuthenticated = require("./methods/auth/access/verifyAuthenticated.js");
AccessControlController.prototype.verifyOAuthRedirect = require("./methods/auth/access/verifyOAuthRedirect.js");
/*AccessControlController.prototype. = require("./methods/auth/access/.js");*/


module.exports = function(controller_function, args){
    
    var ctrl;

    return function(req, res, next){
 
        if(!ctrl){
            
            ctrl = new AccessControlController(req, res);
        }

        ctrl[controller_function.substring(1)].apply(ctrl, ((ctrl.resolveToModel(args)).concat(next)).reverse());
    };

};  