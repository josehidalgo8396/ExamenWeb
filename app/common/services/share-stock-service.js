(function(){
    'use strict';
    angular
        .module('ExamenWeb')
        .service('shareStockService', function() {

            var stockData = {
                currentStockId: -1
            };

            var setId = function(pId) {
                stockData.currentStockId = pId;
            };

            var getId = function() {
                return  stockData.currentStockId;
            };

            return  {
                setStockId: function(pId) {
                    return setId(pId);
                },
                getStockId: function() {
                    return getId();
                }
            };
        });
})();