(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('EditarInventarioCtrl', ["$scope","InventarioService","ProductoService","messageHandlerService" , "shareSessionService","shareStockService","$uibModal","confirmationModalService",
     function ($scope, inventarioService,productoService, messageHandlerService, shareSessionService,shareStockService,$uibModal,confirmationModalService) {
      $scope.stockList = [];
      $scope.inputStock = {};
      $scope.user = {};


      $scope.updateStock = function(pData){
            inventarioService.updateStock(pData).then(function(result) {
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

        
      $scope.getStockById = function(){
        $scope.inputStock.id = shareStockService.getStockId();
      };

      $scope.getStock = function(id) {
        inventarioService.getStockById(id).then(function(result) {
            if(result.success) {
                $scope.inputStock = result.data;
                $scope.getProduct($scope.inputStock.idproduct);
            }
            else {
                messageHandlerService.notifyWarning(null, result.message);
            }
        });
    };

    $scope.getProduct = function(id) {
        productoService.getProductById(id).then(function(result) {
            if(result.success) {
                $scope.inputStock.productName = result.data.name;
            }
            else {
                messageHandlerService.notifyWarning(null, result.message);
            }
        });
    };
      
      $scope.getUser();
      $scope.getStockById();
      $scope.getStock($scope.inputStock.id);
      
  }]);
})();