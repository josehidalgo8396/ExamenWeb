(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('EditarProductoCtrl', ["$scope","ProductoService", "messageHandlerService" , "shareSessionService","shareProductService","$uibModal","confirmationModalService",
     function ($scope, productoService, messageHandlerService, shareSessionService,shareProductService,$uibModal,confirmationModalService) {
      $scope.productList = [];
      $scope.inputProduct = {};
      $scope.user = {};


      $scope.updateProduct = function(pData){
            productoService.updateProduct(pData).then(function(result) {
                if(result.success) {
                    messageHandlerService.notifySuccess(null, result.message);
                }
                else {
                    messageHandlerService.notifyWarning(null, result.message);
                }
            });
        };

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };

        
      $scope.getProductById = function(){
        $scope.inputProduct.id = shareProductService.getProductId();
      };

      $scope.getProduct = function(id) {
        productoService.getProductById(id).then(function(result) {
            if(result.success) {
                $scope.inputProduct = result.data;
            }
            else {
                messageHandlerService.notifyWarning(null, result.message);
            }
        });
    };
      
      $scope.getUser();
      $scope.getProductById();
      $scope.getProduct($scope.inputProduct.id);
      
  }]);
})();