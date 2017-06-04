(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('NuevoProductoCtrl', ["$scope", "ProductoService","messageHandlerService" , "shareSessionService",
     function ($scope,productoService,messageHandlerService, shareSessionService) {
      $scope.usersList = {};
      $scope.inputProduct = {};
      $scope.user = {};

      
      $scope.addProduct = function (newProduct) {
    
        productoService.addProduct(newProduct).then(function(result) {
          if (result.success == true){
            //$scope.getUsers();
            messageHandlerService.notifySuccess(null, result.message)
            $scope.inputProduct = {};
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

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };

      var setModalContent = function(mTitle, mMessage){
        confirmationModalService.setModalContent(mTitle, mMessage);
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
  }]);
})();