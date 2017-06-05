(function(){
    'use strict';
    angular
        .module('ExamenWeb') 
        .service('StockMovementService', function() {

            var stock = {};

            var setStock = function(_stock) {
                stock = _stock;
            };

            var getStock = function() {
                return stock;
            };
           
            return  {
                setStock: function(stock) {
                    setStock(stock); 
                },
                getStock: function() {
                    return stock;
                }
            };
        });
})();