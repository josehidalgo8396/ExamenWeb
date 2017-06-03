
(function(){
    'use strict';
    angular
        .module('ExamenWeb') 
        .factory('LoginService', ['requestService', function(requestService) {
            var logInUser = function(pData){
                var link = '/login';                
                return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp){
                        return pResp; 
                    },  
                    function(pResp){
                        return pResp;   
                    });
            };
       
            return {
                logIn: function(pData){
                    return logInUser(pData);             
                }
            };
        }]);
})();