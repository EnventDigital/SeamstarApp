;(function(w){

   var home = w.angular.module("Seamstar.UI.Home", []);
   
   home
   /*.constant('', '');*/
   .value('$controller', 'Home')
   .run(['RouteHelper', '$controller', homeRun]);


    /* @ngRouteSet */
    function homeRun(RouteHelper, $controller) {
        RouteHelper.configureRoutes(getRoutes($controller));
    }

    function getRoutes(name) {
        return [
            {
                url: '/',
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

}(this));