var BaseController = require("./BaseController.js");

function ProviderAuthController(rq, rs){
	
	BaseController.call(this, rq, rs);
	
	this.role = "tailor";

	return this;
}

ProviderAuthController.prototype = Object.create(BaseController.prototype, {});
ProviderAuthController.prototype.constructor = ProviderAuthController;

ProviderAuthController.prototype.generateUserTimeStampSum = function(){

}

ProviderAuthController.prototype.registerProviderUser = require("./methods/auth/provider/registerProviderUser.js");
ProviderAuthController.prototype.authenticateProviderUser = require("./methods/auth/provider/authenticateProviderUser.js");
ProviderAuthController.prototype.loginProviderUser = require("./methods/auth/provider/loginProviderUser.js");


module.exports = function(controller_function, args){
    
    var ctrl;

    return function(req, res, next){
 
        if(!ctrl){
            
            ctrl = new ProviderAuthController(req, res);
        }

        ctrl[controller_function.substring(1)].apply(ctrl, ((ctrl.resolveToModel(args)).concat(next)).reverse());
    }

};  