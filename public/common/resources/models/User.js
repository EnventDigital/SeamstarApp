;(function(w){

  var modl = w.angular.module('Seamstar.Models');

  modl.factory('User', ['Organization', '$ModelProto', function(Organization, $ModelProto){

            function User(fN, lN, email, role){
               this.fisrtName = fN;
               this.lastName = lN;
               this.email = email;
               this.organization = new Organization(role);
               
               $ModelProto.call(this);

               return this;
            }

            User.unbundle = $ModelProto.setUnbundle();

            User.prototype = Object.create($ModelProto.prototype, {});

            User.prototype.fillName = function(){
              return this.firstName + " " + this.lastName;
            }

            return User;

  }]);


}(this));