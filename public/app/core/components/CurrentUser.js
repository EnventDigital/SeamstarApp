;(function(w){

	 var cmpn = angular.module("Seamstar.Core.Components");
	 
	 cmpn.factory("$user", ['$rootScope', '$window', function($rootScope, $window){

		  var service = {
			  register : function(response){
					$window.localStorage.currentUser = JSON.stringify(reponse.data.user) // @TODO: need to encrypt user data from server using MCRYPT_RIJNDEAL_256 before putting it into localStorage
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
			  }
		  }   

		 return service;

	 }]);     


}(this));