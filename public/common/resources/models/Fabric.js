;(function(w){

  var modl = w.angular.module('Seamstar.Models');

  modl.factory('Fabric', ['$ModelProto', function($ModelProto){
 
         
            function Fabric(material){
               this.color = null;
               this.material = material;
			   
               $ModelProto.call(this);
            
               return this;
            }

            Fabric.unbundle = $ModelProto.setUnbundle();

            Fabric.prototype = Object.create($ModelProto.prototype, {});

            return Fabric;

  }]);


}(this));