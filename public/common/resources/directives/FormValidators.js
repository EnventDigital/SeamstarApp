;(function(){

 var dirc = angular.module("Seamstar.Directives");

  dirc
  .directive('matchValidator', function() {
    
             return {
      
                  require: 'ngModel',
      
                  link : function(scope, element, attrs, ngModel) {
        
                         ngModel.$parsers.push(function(value) {
         
                                 ngModel.$setValidity('match', value == scope.$eval(attrs.matchValidator));
         
                                 return value;
        
                         });
      
                  }
    
             }
  
  })

  .directive('serverError', function(){

         return {

             require:'ngModel',

             link : function(scope, element, attrs, ngModel){
 
                   element.on('keydown',  function(event){

                       ngModel.$setValidity('server', true);
                   });
              
             }

         }

  })

  .directive('passwordCharactersValidator', function() {
    
          var PASSWORD_FORMATS = [
      
                  /[^\w\s]+/, //special characters
      
                  /[A-Z]+/, //uppercase letters
      
                  /\w+/, //other letters
      
                  /\d+/ //numbers
              ];

    

                 return {
     
                       require: 'ngModel',
      
                       link : function(scope, element, attrs, ngModel) {
        
                                ngModel.$parsers.push(function(value) {
          
                                         var status = true;
          
                                         angular.forEach(PASSWORD_FORMATS, function(regex) {
            
                                                 status = status && regex.test(value);
          
                                         });
          
                                         ngModel.$setValidity('password-characters', status);
          
                                         return value;
        
                                });
     
                         }
    
                 }
  
  });

}());