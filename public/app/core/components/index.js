;(function(w){

    var core = w.angular.module("Seamstar.Core.Components", [
	    'ngMessages', 
		'ngCookie', 
		'ngTouch'
	]);
    
    core.constant('DumbPasswordRegex', /^/);
    core.constant('EmailRegex', /^/);
    
	
}(this));