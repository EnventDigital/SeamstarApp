;(function(w){

   var lyt = w.angular.module("Seamstar.Core.Layout");
   
   var ModalInstanceCtrl = function($scope, $modalInstance, $modal, item) {

       $scope.ok = function () {
             $modalInstance.close();
       };

       $scope.cancel = function () {
             $modalInstance.dismiss('cancel');
       };
   }
   
   lyt.controller("AccountsModalController", ['$scope', '$user', '$auth',  function($scope, $user, $auth){

         /* */

         $scope.errorMessages = {};
		 
		 $scope.template = {
		     url:'common/resources/partials/login.modal.html'
		 }
		 
		 $scope.myFunction = function(){
		 
		 };

         /* SIGN IN */

         $scope.socialLogin = function(OAuthProviderName){
             $auth.authenticate(OAuthProviderName)
              .then($user.registerUser);
         }
         
         $scope.emailLogin = function(){
             $auth.login({email: $scope.email, password: $scope.password })
              .then($user.registerUser)
              .catch(function(response){
                   w.angular.forEach(response.data.message, function(message, field){
                       $scope.loginForm[field].$setvalidity('server', false);
                       $scope.errorMessages[field] = response.data.message[field];
                   });
              });
         }

         /* SIGN UP */

         $scope.emailSignUp = function(){

             var user = {
                 email: $scope.email,
                 password: $scope.password,
                 mobile: $scope.mobile,
                 full_name:$scope.full_name
             };

             
             $auth.signup(user)
			  .then(function(response){
			  
			  })
              .catch(function(response){
                  console.log(response.data);
              });
         };

         $scope.allFields = [];
             
         $scope.incompleteSignUp = true;
		 
		 $scope.genders = [
			  'Male',
			  'Female'
		];

       //$scope.phoneNumberRegex = /\(\d{3}\) \d{3}-\d{4}/;

		$scope.fakeUsernames = ['angular', 'username', 'user', 'john', 'eric', 'noob', 'ng'];
		$scope.fakeEmails = [
		  'email@email.com',
		  'email@gmail.com',
		  'email@website.com',
		  'jon@gmail.com',
		  'fake@gmail.com',
		  'fake@email.com'
		];

        $scope.detectChange = function(event, field){
                 var $index;
                 if(event.target && event.target.id){
                     if(field.$dirty){
                         if($scope.allFields.indexOf(event.target.id) == -1){
                              $scope.allFields.push(event.target.id);
                         }
                     }else{
                         $index = $scope.allFields.indexOf(event.target.id);
                         $scope.allFields.splice($index, 1);
                     }    
                 }
                 if($scope.allFields.length == 4){
                      $scope.incompleteSignUp = false;
                 }
         };
   
   }]);

   lyt.controller("AccountsBarController", ['$scope', '$uibModal', function($scope, $uibModal){

         $scope.animationsEnabled = true;

		 $scope.open = function (size) {

			var modalInstance = $uibModal.open({
			  backdrop: true,
			  backdropClick: true,
			  dialogFade: false,
			  keyboard: true,
			  animation: $scope.animationsEnabled,
			  templateUrl: 'common/resources/partials/login.modal.html',
			  controller: ModalInstanceCtrl,
			  size: size,
			  resolve: {
				items: function () {
				  return ['U'];
				}
			  }
			});

			modalInstance.result.then(function (errorMessage) {
			 
			}, function () {
			   //$log.info('Modal dismissed at: ' + new Date());
			});
		  };

		  $scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		  };
   
   }]);

   lyt.controller("SearchModalController", ['$scope', function($scope){
 
        $scope.template = {
		   url:'common/resources/partials/search.modal.html'
		};
		
		$scope.myFunction = function(){
		
		};
   
   }]);

   lyt.controller("SearchBarController", ['$scope', '$uibModal', function($scope, $uibModal){
             
	    $scope.animationsEnabled = true;

		$scope.open = function (size) {

			var modalInstance = $uibModal.open({
			  backdrop: true,
			  backdropClick: true,
			  dialogFade: false,
			  keyboard: true,
			  animation: $scope.animationsEnabled,
			  templateUrl: 'common/resources/partials/search.modal.html',
			  controller: ModalInstanceCtrl,
			  size: size,
			  resolve: {
				items: function () {
				  return ['T'];
				}
			  }
			});

			modalInstance.result.then(function (nothing) {
			  
			}, function () {
			  $log.info('Modal dismissed at: ' + new Date());
			});
		  };

		  $scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		  };
   
   }]);

   lyt.controller("NavBarController", ['$scope', '$location', function($scope, $location){

       var routeMap = {
           'Home':"/#/",
           'Sew A Design':"javascript:void(null)",
           'Buy/Sell':"javascript:void(null)",
           'For Weddings':"/#/for-weddings",
           'Become a Tailor':"/#/become-tailor",
           'Apply As Partner':"/#/partners"
       };

        $scope.navigationButtons = {
           'Home':[],
           'Sew A Design':[
                {root:"products/kaftan", link:"Kaftan"},
                {root:"products/buba", link:"Buba"},
                {root:"products/u", link:"U"},
                {root:"products/a", link:"A"},
                {root:"", link:""}, // 4
                {root:"products/h", link:"H"}, 
                {root:"products/k", link:"K"},
                {root:"", link:""}, // 7
                {root:"products/aso_e", link:"Aso Ebi"},
                {root:"products/aso_o", link:"Aso Oke"}
            ],
            'Buy/Sell':[
              {root:"buy/designs", link:"Designs"},
              {root:"buy/fabrics", link:"Fabrics"}
            ],
            'For Weddings':[],
            'Become a Tailor':[],
            'Apply As Partner':[]
        };

        $scope.determinePath = function(routeName){
            return (routeMap[routeName] || "");
        }

        $scope.isPathActive = function(routeName){
            return $scope.determinePath(routeName) === $location.path();
        };

        $scope.hasSubLinks = function(sublinks){
            return (sublinks.length > 0);
        }
   
   }]);

   lyt.controller("BrandingController", ['$scope', function($scope){

   
   }]);

   lyt.controller("NewsLetterSubscriberController", ['$scope', function($scope){

   
   }]);

   lyt.controller("CopyrightController", ['$scope', function($scope){

   
   }]);

}(this));