;(function(w){

  var ui = w.angular.module("Seamstar.UI", [
      'Seamstar.UI.Home', 
      /*'Seamstar.UI.Explore', */
	  'Seamstar.UI.Products',
	  'Seamstar.UI.Partners'
  ])/*.run(['$q', function($q){
      console.log("Seamstar: Registering UI... ");
  }]);*/

}(this));