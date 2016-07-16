;(function(w){

  var base = w.angular.module('Seamstar.Controllers');

  base.controller("BaseController", ['$scope', '$window', '$auth', '$rootScope', '$user', function($scope, $window, $auth, $rootScope){

      $rootScope.accountLinked = false;

      $scope.canAddToWardrobe = function(currentUrl){
           
      };

      $scope.canAddToCart = function(currentUrl){

      };

      $scope.addToCart = function(){
          // $scope.broadcast();
      };

      $rootScope.isAuthenticated = function(){
          return $auth.isAuthenticated();
      };

      $rootScope.logout = function(){
             $auth.logout();
             delete $window.localStorage.currentUser;
      };

      $rootScope.linkAccount = function(OAuthProviderName){ 
          $rootScope.accountLinked = true;
          $auth.link(OAuthProviderName)
           .then($user.register);
      } 

  }]);

}(this));