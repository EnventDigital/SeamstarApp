;(function(w){

  var modl = w.angular.module('Seamstar.Models');

  modl.factory('Organization', ['$ModelProto', function($ModelProto){
 
            var group;

            function Organization(role){
               this.identity = role.title;
               this.permission = (role.assigned)? role.permit : "";
               $ModelProto.call(this);
            
               return this;
            }

            Organization.unbundle = $ModelProto.setUnbundle();

            Organization.prototype = Object.create($ModelProto.prototype, {});

            Organization.prototype.get = function(){
                 return "";
            }

            return Organization;

  }]);


}(this));