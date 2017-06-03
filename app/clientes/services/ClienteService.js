(function(){
    'use strict';
    angular
        .module('ExamenWeb') 
        .factory('ClienteService', [
            'requestService',
            function(requestService) {

                var createCliente = function(pData) {
                    var link = '/clientes';                  
                    return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getAllClients = function(pData) {
                    var link = '/clientes';                  
                    return  requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var disableClient = function(pData) {
                    var link = '/clientes/deshabilitar/';                  
                    return  requestService.putRequest({params: pData.id}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getClient = function(pData) {
                    var link = '/clientes/';                  
                    return  requestService.getRequest({params: pData}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var updateClient = function(pData) {
                    var link = '/clientes/';                  
                    return  requestService.putRequest({data: pData, params: pData.idnumber}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };
                
                return {
                    newClient: function(pData) {
                        return createCliente(pData);
                    },
                    getClients: function() {
                        return getAllClients();
                    },
                    disableClient: function(pData) {
                        return disableClient(pData);
                    },
                    getClient: function(pData) {
                        return getClient(pData);
                    },
                    editClient: function(pData) {
                        return updateClient(pData);
                    }
                };
        }]);
})();