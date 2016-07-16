var BaseController = require("./BaseController.js");

function AppController(rq, rs){
	
	BaseController.call(this, rq, rs);
	
	return this;
}

AppController.prototype = Object.create(BaseController.prototype, {});
AppController.prototype.constructor = AppController;

AppController.prototype.siteIndex = require("./methods/application/pages/siteIndex.js");
AppController.prototype.adminIndex = require("./methods/application/pages/adminIndex.js");
AppController.prototype.tailorIndex  = require("./methods/application/pages/tailorIndex.js");


module.exports = function(controller_function, args){
    
    var ctrl;

    return function(req, res, next){
 
        if(!ctrl){
            
            ctrl = new AppController(req, res);
        }

        ctrl[controller_function.substring(1)].apply(ctrl, ((ctrl.resolveToModel(args)).concat(next)).reverse());
    };

};  