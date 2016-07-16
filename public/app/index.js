;(function(w){

   // Main Module
   w.angular.module("Seamstar", [
       'Seamstar.Common',
       'Seamstar.Core',
	   'Seamstar.UI'
   ]) 
   .config(["$routeProvider", "$authProvider", '$httpProvider', function($routeProvider, $authProvider, $httpProvider){

        
        $authProvider.twitter({
           name: 'twitter',
           url: 'http://localhost:3001/api/service/exchange/twitter', /*  page */
           clientId: ''
        });

        $authProvider.instagram({
           name: 'instagram',
           url: 'http://localhost:3001/api/service/exchange/instagram', /*  page */
           clientId: ''
        });

        $authProvider.facebook({
           name: 'facebook',
           url: 'http://localhost:3001/api/service/exchange/facebook', /*  page */
           clientId: '',
           popupOptions: {width: 452, height: 500}
        });

        $authProvider.google({
           name: 'google',
           url: 'http://localhost:3001/api/service/exchange/google', /*  page */
           clientId: ''
        });

        $authProvider.signInUrl = 'http://localhost:3001/api/service/user/signin';
        $authProvider.signUpUrl = 'http://localhost:3001/api/service/user/signup';
        $authProvider.loginOnSignup = false; // don't sign in immediately after registration
        $authProvider.loginRoute = null; // don't automagically redirect to login route

        $httpProvider.interceptors.push(['$q', function($q){
              var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

              return {
                   request : function(httpConfig){
                       var token = w.localStorage.getItem(tokenName);
                       if(token){
                           token = config.authHeader === 'Authorization' ? 'Bearer ' + token : token;
                           httpConfig.headers[config.authHeader] = token;
                       }
                       return httpConfig;
                   },
                   responseError: function(response){
                       return $q.reject(reponse);
                   }
              }
        }]);
   
        $routeProvider.otherwise({redirectTo: '/'});
		
   }])
   .run(["$templateCache", "$auth", "$rootScope", "$window",

      function($templateCache, $auth, $rootScope, $window){
          console.log("Seamstar: Registering MAIN Seamstar Application... ");
           // $templateCache.put("", "");

          if($auth.isAutheticated()){
              $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          }
   }]);
   

}(this));