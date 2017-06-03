(function(){
    'use strict';
    angular
        .module('ExamenWeb')
        .service('ShareClientService', function() {

            var client = {
                id: -1
            };

            var setId = function(pId) {
                client.id = pId;
            };

            var getId = function() {
                return  client.id;
            };

            return  {
                setClientId: function(pId) {
                    return setId(pId);
                },
                getClientId: function() {
                    return getId();
                }
            };
        });
})();