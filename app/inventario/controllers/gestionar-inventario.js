(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('GestionInventarioCtrl', ["$scope","$state","InventarioService","ProductoService","messageHandlerService" , "shareSessionService","shareStockService","$uibModal","confirmationModalService",
     function ($scope,$state, inventarioService,productoService, messageHandlerService, shareSessionService,shareStockService,$uibModal,confirmationModalService) {
      $scope.productList = [];
      $scope.stockList = [];
      $scope.inputStock = {};
      $scope.user = {};


      $scope.getStocks = function(){
        inventarioService.getStocks().then(function(result) {
          if (result.success){
            $scope.stockList = result.data;
            //console.log($scope.productList);
            $scope.getProducts();
            
          }
          else{
            //$scope.productList = {};
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
            //console.log($scope.productList);
          }
          else{
            //$scope.productList = {};
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

       $scope.disableStock = function(pId) {
        $scope.openConfirmationModal(function(response){
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

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };

      
      var setModalContent = function(mTitle, mMessage){
        confirmationModalService.setModalContent(mTitle, mMessage);
      };

      $scope.openConfirmationModal = function (callback) {
        setModalContent('Deshabilitar Inventario', '¿Está seguro(a) de que desea deshabilitar el inventario?');
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'confirmationModalTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {}
        });

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