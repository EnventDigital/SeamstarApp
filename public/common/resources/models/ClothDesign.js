;(function(w){

  var modl = w.angular.module('Seamstar.Models');

  modl.factory('ClothDesign', ['Fabric', '$ModelProto', function(Fabric, $ModelProto){

            function ClothDesign(placketType, waistLength, collarType, sleeveType){
               this.placketType = placketType;
			   this.waistLength= waistLength;
               this.sleeveType = sleeveType;
               this.collarType = collarType;
               this.fabric = new Fabric('cotton');
               
               $ModelProto.call(this);

               return this;
            }

            ClothDesign.unbundle = $ModelProto.setUnbundle();

            ClothDesign.prototype = Object.create($ModelProto.prototype, {});

            ClothDesign.prototype.size = function(sizeUnits){
                return [];
            }

            return ClothDesign;

  }]);


}(this));