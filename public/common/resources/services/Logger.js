;(function(w){
  
     var srvc = w.angular.module("Seamstar.Services");

     srvc.factory("Logger", ['$timeout', '$log', function($timeout, $log){


          return {
             warning:warning,
             error:error,
             info:info
          };

          function warning(){

          }

          function error(){

          }

          function info(){

          }
     }]); 

}(this));