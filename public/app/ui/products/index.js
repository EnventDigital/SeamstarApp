;(function(){

   var products = angular.module('Seamstar.UI.Products', []);
   
   products
   /*.constant('', '')*/
   .value('$controller', 'Products')
   .run(['RouteHelper', '$controller', productsRun]);


    /* @ngRouteSet */
    function productsRun(RouteHelper, $controller) {
        RouteHelper.configureRoutes(getRoutes($controller));
    }

    function getRoutes(name) {
        return [
            {
                url: '/products/:clothtype',
                config: {
                    templateUrl: 'app/ui/'+name.toLowerCase()+'/partials/index.html',
                    controller: name,
                    /*controllerAs: 'vm',*/
                    title: name,
                    settings: {
                        accessControl:{
                           requireLogin:false,
                           guestAllowed:true
                        },
                        openContent: '<div class="fa fa-dashboard"></div>'
                    }
                }
            }
        ];
    }

}());