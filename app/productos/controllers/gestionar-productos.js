(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('GestionProductosCtrl', ["$scope","$state","ProductoService", "messageHandlerService" , "shareSessionService","shareProductService","$uibModal","confirmationModalService",
     function ($scope,$state, productoService, messageHandlerService, shareSessionService,shareProductService,$uibModal,confirmationModalService) {
      $scope.productList = [];
      $scope.inputProduct = {};
      $scope.user = {};


      $scope.getProducts = function(){
        productoService.getProducts().then(function(result) {
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

      $scope.sendToUpdateProductView = function(pId) {
        shareProductService.setProductId(pId);
        $state.go('editar-producto');
      };

      /*
      $scope.editUser = function(userToEdit){
        $scope.inputUser.username = userToEdit.username;
        $scope.inputUser.password = userToEdit.password;
        $scope.inputUser.rol = userToEdit.rol.toString();
      };

      $scope.updateUser = function (userToUpdate) {
        usuarioService.editUser(userToUpdate).then(function(result) {
          if (result.success){
            for(var i=0; i<$scope.usersList.length; i++) {
              if($scope.usersList[i].username == userToUpdate.username) {
                $scope.usersList[i].password = userToUpdate.password;
                $scope.usersList[i].rol = userToUpdate.rol;
                break;
              }
            }
            messageHandlerService.notifySuccess(null, result.message)
            $scope.inputUser = {};
          }
          else{
            messageHandlerService.notifyError(null, result.message);
          }
        });
      };
      
      $scope.addUser = function (newUser) {
        usuarioService.addUser(newUser).then(function(result) {
          if (result.success == true){
            $scope.getUsers();
            messageHandlerService.notifySuccess(null, result.message)
            $scope.inputUser = {};
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
*/
       $scope.disableProduct = function(pId) {
        $scope.openConfirmationModal(function(response){
          if (!response.success){
            return;
          }
          var data = {id: pId};
          productoService.disableProduct(data).then(function(result) {
            if(result.success) {
              messageHandlerService.notifySuccess(null, result.message);
              $scope.productList = [];  
              $scope.getProducts();
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
        setModalContent('Deshabilitar producto', '¿Está seguro(a) de que desea deshabilitar el producto?');
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
      $scope.getProducts();
  }]);
})();