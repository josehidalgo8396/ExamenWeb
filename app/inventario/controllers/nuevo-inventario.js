(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('NuevoInventarioCtrl', ["$scope", "InventarioService","messageHandlerService" , "shareSessionService",
     function ($scope,inventarioService,messageHandlerService, shareSessionService) {
      $scope.usersList = {};
      $scope.productList = [];
      $scope.inputStock = {};
      $scope.user = {};

      
      $scope.addStock = function (newStock) {
        inventarioService.addStock(newStock).then(function(result) {
          if (result.success == true){
            //$scope.getUsers();
            messageHandlerService.notifySuccess(null, result.message)
            $scope.removeProduct();
            $scope.inputStock = {};

          }
          else{
            if (!result.message) {
              messageHandlerService.notifyError(null, "Por favor revise los valores ingresados");
              return;
            };
            messageHandlerService.notifyError(null, result.message);
          }
        });
      };

      $scope.removeProduct = function(){
        for (var index = 0; index < $scope.productList.length; index++) {
          if ($scope.inputStock.idProduct == $scope.productList[index].id){
              $scope.productList.splice(index,1);
              break;
          }
        }
      }

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };

      var setModalContent = function(mTitle, mMessage){
        confirmationModalService.setModalContent(mTitle, mMessage);
      };

      $scope.getProductsNotStock = function(){
        inventarioService.getProductsNotStock().then(function(result) {
          if (result.success){
            $scope.productList = result.data;
            //console.log($scope.productList);
          }
          else{
            //$scope.productList = {};
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };
/*
      $scope.openConfirmationModal = function (callback) {
        setModalContent('Deshabilitar usuario', '¿Está seguro(a) de que desea deshabilitar el usuario?');
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
      };*/

      $scope.getUser();
      $scope.getProductsNotStock();
  }]);
})();