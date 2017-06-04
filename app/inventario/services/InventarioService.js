(function(){
	'use strict';
	angular
		.module("ExamenWeb")
		.factory("InventarioService", ["requestService", function(requestService) {
			var getS = function() {
				var link = "/stock";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addS = function(pData) {
				var link = "/stock";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var editS = function(pData) {
				var link = "/stock/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var delS = function(pData){
				var link = "/stock/disable/";
				return requestService.putRequest({params: pData.usuario, data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var getSById = function(pId) {
                var link = '/stock/';
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var getProdNotStock = function() {
                var link = "/stock";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
            };

            

			return {
				getStocks: function() {
					return getS();
				},
				addStock: function(pData) {
					return addS(pData); 
				},
				updateStock: function(pData) {
					return editS(pData);
				},
				disableStock: function(pData){
					return delS(pData);
				},
				getStockById: function(pData){
					return getSById(pData);
				},
                getProductsNotStock: function(){
                    return getProdNotStock();
                }
			};
		}]);
})();