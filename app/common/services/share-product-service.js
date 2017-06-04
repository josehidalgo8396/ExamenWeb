(function(){
    'use strict';
    angular
        .module('ExamenWeb')
        .service('shareProductService', function() {

            var productData = {
                currentProductId: -1
            };

            var setId = function(pId) {
                productData.currentProductId = pId;
            };

            var getId = function() {
                return  productData.currentProductId;
            };

            return  {
                setProductId: function(pId) {
                    return setId(pId);
                },
                getProductId: function() {
                    return getId();
                }
            };
        });
})();