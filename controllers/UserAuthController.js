var BaseController = require("./BaseController.js");

function UserAuthController(rq, rs){
	
	BaseController.call(this, rq, rs);
	
	this.role = "user";

	return this;
}

UserAuthController.prototype = Object.create(BaseController.prototype, {});
UserAuthController.prototype.constructor = UserAuthController;

UserAuthController.prototype.generateUserTimeStampSum = function(){

}

UserAuthController.prototype.registerServiceUser = require("./methods/auth/service/registerServiceUser.js");
UserAuthController.prototype.authenticateServiceUser = require("./methods/auth/service/authenticateServiceUser.js");
UserAuthController.prototype.loginServiceUser = require("./methods/auth/service/loginServiceUser.js");


module.exports = function(controller_function, args){
    
    var ctrl;

    return function(req, res, next){
 
        if(!ctrl){
            
            ctrl = new UserAuthController(req, res);
        }

        ctrl[controller_function.substring(1)].apply(ctrl, ((ctrl.resolveToModel(args)).concat(next)).reverse());
    }

};  