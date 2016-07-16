;(function(w){

 var srvc = w.angular.module("Seamstar.Services");
 
 srvc.factory("RouteHelper", ['$window', '$location', '$rootScope', '$route', 'Logger', 'routeConfig', '$routeProvider',
				function ($window, $location, $rootScope, $route, Logger, routeConfig, $routeProvider) {

					var handlingRouteChangeError = false;
					var routeCounts = {
						errors: 0,
						changes: 0
					};
					var routes = [];

					
					function configureRoutes(routes) {
						routes.forEach(function(route) {
							route.config.resolve =
								angular.extend(route.config.resolve || {}, routeConfig.config.resolveAlways);
							$routeProvider.when(route.url, route.config);
						});
					}

					function handleRoutingErrors() {
						// Route cancellation:
						// On routing error, go to the dashboard.
						// Provide an exit clause if it tries to do it twice.
						$rootScope.$on('$routeChangeError',
							function(event, current, previous, rejection) {
								if (handlingRouteChangeError) {
									return;
								}
								routeCounts.errors++;
								handlingRouteChangeError = true;
								var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
									'unknown target';
								var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
								Logger.warning(msg, [current]);
								$location.path('/');
							}
						);
					}

					function init() {
						handleRoutingErrors();
						updateDocTitle();
						showLoadingScreen();
					}

					function getAppRoutes() {
						for (var prop in $route.routes) {
							if ($route.routes.hasOwnProperty(prop)) {
								var route = $route.routes[prop];
								var isRoute = !!route.title;
								if (isRoute) {
									routes.push(route);
								}
							}
						}
						return routes;
					}

					function updateDocTitle() {
						$rootScope.$on('$routeChangeSuccess',
							function(event, current, previous) {
								routeCounts.changes++;
								handlingRouteChangeError = false;
								var title = routeConfig.config.docTitle + ' ' + (current.title || '');
								$rootScope.title = title; // data bind to <title> tag
								$rootScope.loading = false;
								if($window.localStorage.currentUser){
								    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
							    }
							}
						);
					}

					function showLoadingScreen(){
						 $rootScope.$on('$routeChangeStart',
							function(event, current, previous) {
								// show the screen [view binds by ng-show={{ loading }}]
								var title = routeConfig.config.docTitle + ' ' + 'Loading...';
								$rootScope.title = title; // data bind to <title> tag
								$rootScope.loading = true;
								if(current.settings 
								  && current.settings.accessControl 
								  && current.settings.accessControl.requireLogin
								  && !current.settings.accessControl.guestAllowed
								  && !$rootScope.currentUser){
								      $rootScope.$broadcast("userneedlogin");
									  $location.path(previous.url);
								  }else{
								      // If the user details haven't been cached, then, cache it.
								      if(!$window.localStorage.currentUser){
									      $window.localStorage.currentUser = JSON.stringify($rootScope.currentUser);
									  }
								  }
							}
						);
					} 

					
					init();

					var service = {
						configureRoutes: configureRoutes,
						getAppRoutes: getAppRoutes,
						routeCounts: routeCounts
					};


					return service;

				}]);
}(this));
