(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('GestionInventarioCtrl', ["$scope","$state","InventarioService","ProductoService","messageHandlerService" , "shareSessionService","shareStockService","$uibModal","confirmationModalService","StockMovementService",
     function ($scope,$state, inventarioService,productoService, messageHandlerService, shareSessionService,shareStockService,$uibModal,confirmationModalService, stockMovementService) {
      $scope.productList = [];
      $scope.stockList = [];
      $scope.inputStock = {};
      $scope.user = {};


      $scope.getStocks = function(){
        inventarioService.getStocks().then(function(result) {
          if (result.success){
            $scope.stockList = result.data;
            $scope.getProducts();
            
          }
          else{
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

      $scope.findProductName = function(){
        for (var i = 0; i < $scope.stockList.length; i++) {
              for (var j = 0; j < $scope.productList.length; j++) {
                if($scope.stockList[i].idproduct == $scope.productList[j].id){
                  $scope.stockList[i].productName = $scope.productList[j].name;
                }
            }
        }
      }

      $scope.sendToUpdateStockView = function(pId) {
        shareStockService.setStockId(pId);
        $state.go('editar-inventario');
      };


      $scope.getProducts = function(){
        productoService.getProducts().then(function(result) {
          if (result.success){
            $scope.productList = result.data;
            $scope.findProductName();
          }
          else{
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

       $scope.disableStock = function(pId) {
        $scope.openConfirmationModal(1,function(response){
          if (!response.success){
            return;
          }
          var data = {id: pId};
          inventarioService.disableStock(data).then(function(result) {
            if(result.success) {
              messageHandlerService.notifySuccess(null, result.message);
              $scope.stockList = [];  
              $scope.getStocks();
            }
            else {
              messageHandlerService.notifyWarning(null, result.message);
            }
          });
        });
      };

      $scope.setMovementStock = function(stock) {
          stockMovementService.setStock(stock);
          $scope.openConfirmationModal(0, function(response) {
              if(!response.success) {
                return;
              }
              for(var i=0; i<$scope.stockList.length; i++) {
                if(stock.id == $scope.stockList[i].id) {
                  $scope.stockList[i].amount += stock.newAmount;
                  break;
                }
              }
          });
      };

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };

      
      var setModalContent = function(mTitle, mMessage){
        confirmationModalService.setModalContent(mTitle, mMessage);
      };

      $scope.openConfirmationModal = function (type, callback) {
        var modalInstance;
        if(type == 1) {
            setModalContent('Deshabilitar Inventario', '¿Está seguro(a) de que desea deshabilitar el inventario?');
            modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'confirmationModalTemplate.html',
              controller: 'ModalInstanceCtrl',
              size: 'sm',
              resolve: {}
            });
        }
        else {
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'stockMovementTemplate.html',
                controller: 'StockMovementCtrl',
                size: 'md',
                resolve: {}
              });
        }

        modalInstance.result.then(
          function (confirmationResponse) {
            callback({
              success: confirmationResponse
            });
        }, function () {
          callback({
              success: false
            });
        });
      };

      $scope.getUser();
      $scope.getStocks();
  }]);
})();