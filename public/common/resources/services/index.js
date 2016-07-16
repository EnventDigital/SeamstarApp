;(function(w){

   'use strict';

   var srvc = w.angular.module('Seamstar.Services', []);
   
    srvc
	.value('routeConfig', {
	     config:{
		    docTitle:'Seamstar - ',
			resolveAlways:function(){
			
			}
		 }
	})
	/*.filter('', function(){
	 
	    return function(){
		
		}
	});*/
	
}(this));