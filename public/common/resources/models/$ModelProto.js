;(function(w){

  var modl = w.angular.module('Seamstar.Models');

  modl.factory('$ModelProto', ['$timeout', function($timeout){
 
            function $ModelProto(){

                 //this. = ;
               
                 return this;
            }

            $ModelProto.prototype.toArray = function(){

                  return "";
            }

            $ModelProto.setUnbundle = function(){

                  var $Model = this; // this will be the Model Constructor

                  if($Model === $ModelProto){ // 
                      
                      return null;
                  }
  			    
          				return function(data){
                         
                        var model = new $Model();

                        if(data && Array.isArray(data)){
          				             
                               
          				      }
          				   
          				      data = JSON.parse(data);
          				} 
			      };

            $ModelProto.prototype.constructor = $ModelProto;

            return $ModelProto;

  }]);


}(this));