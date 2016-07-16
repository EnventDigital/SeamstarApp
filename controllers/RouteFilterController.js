var BaseController = require("./BaseController.js");

function RouteFilterController(rq, rs){
	
	BaseController.call(this, rq, rs);
	
	return this;
}

RouteFilterController.prototype = Object.create(BaseController.prototype, {});
RouteFilterController.prototype.constructor = RouteFilterController;

RouteFilterController.prototype.roleMiddleWare = require("./methods/application/routefilters/roleMiddleWare.js");
RouteFilterController.prototype.providerMiddleWare = require("./methods/application/routefilters/providerMiddleWare.js");


module.exports = function(controller_function, args){
    
    var ctrl;

    return function(req, res, next, param){
 
        if(!ctrl){
            
            ctrl = new RouteFilterController(req, res);
			
			ctrl.param = param;
        }

        ctrl[controller_function.substring(1)].apply(ctrl, ((ctrl.resolveToModel(args)).concat(next)).reverse());
    };

};  