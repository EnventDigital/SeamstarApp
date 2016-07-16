;(function(w){

     var partners = w.angular.module("Seamstar.UI.Partners", []);

     partners
	 .value('$controller', 'Partners')
     .run(['RouteHelper', '$controller', partnersRun]);

     function partnersRun(RouteHelper, $controller) {
        RouteHelper.configureRoutes(getRoutes($controller));
    }

    function getRoutes(name) {
        return [
            {
                url: '/partners',
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