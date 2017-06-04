(function(){
	'use strict';
	angular
		.module("ExamenWeb")
		.factory("ProductoService", ["requestService", function(requestService) {
			var getP = function() {
				var link = "/products";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addP = function(pData) {
				var link = "/products";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var editP = function(pData) {
				var link = "/products/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var delP = function(pData){
				var link = "/products/disable/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var getProdById = function(pId) {
                var link = '/products/';
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

			return {
				getProducts: function() {
					return getP();
				},
				addProduct: function(pData) {
					return addP(pData); 
				},
				updateProduct: function(pData) {
					return editP(pData);
				},
				disableProduct: function(pData){
					return delP(pData);
				},
				getProductById: function(pData){
					return getProdById(pData);
				}
			};
		}]);
})();