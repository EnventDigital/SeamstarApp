;(function(w){

var dirc = w.angular.module('Seamstar.Core.Components');
 
  

dirc.directive('openTab', function() {

return {

 restrick:'A',
 
 link:function(scope, element, attr) {
              var i, x, tablinks, cityName = attr.openTab;
              x = w.angular.element(".seamstar-tab-content-hidden");
              x.css({display:"none"});
             
              tablinks = w.angular.element(".seamstar-tab-link");
              tablinks.removeClass("w3-yellow"); 
            
              w.angular.element("#cityName").css({display:"block"});
              element.addClass("w3-yellow");
         }
 };

});


}(this));