var BaseController = require("./BaseController.js");

function AdminAuthController(rq, rs){
	
	BaseController.call(this, rq, rs);
	
	this.role = "administrator";

	return this;
}

AdminAuthController.prototype = Object.create(BaseController.prototype, {});
AdminAuthController.prototype.constructor = AdminAuthController;

AdminAuthController.prototype.generateUserTimeStampSum = function(){

}

AdminAuthController.prototype.registerAdminUser = require("./methods/auth/admin/registerAdminUser.js");
AdminAuthController.prototype.authenticateAdminUser = require("./methods/auth/admin/authenticateAdminUser.js");
AdminAuthController.prototype.loginAdminUser = require("./methods/auth/admin/loginAdminUser.js");


module.exports = function(controller_function, args){
    
    var ctrl;

    return function(req, res, next){
 
        if(!ctrl){
            
            ctrl = new AdminAuthController(req, res);
        }

        ctrl[controller_function.substring(1)].apply(ctrl, ((ctrl.resolveToModel(args)).concat(next)).reverse());
    }

};  