(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('GestionUsuariosCtrl', ["$scope", "UsuarioService", "messageHandlerService" , "shareSessionService","$uibModal","confirmationModalService",
     function ($scope, usuarioService, messageHandlerService, shareSessionService,$uibModal,confirmationModalService) {
      $scope.usersList = {};
      $scope.inputUser = {};
      $scope.user = {};


      $scope.getUsers = function(){
        usuarioService.getUsers().then(function(result) {
          if (result.success){
            $scope.usersList = result.data;
            console.log($scope.usersList);
          }
          else{
            $scope.usersList = {};
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

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

      $scope.disableUser = function(pId){
        $scope.openConfirmationModal(function(response){
          if (!response.success){
            return;
          }
          var data = {usuario: pId};
          usuarioService.disableUser(data).then(function(result){
            if(result.success == true){
              messageHandlerService.notifySuccess(null, result.message);
              for(var i=0; i<$scope.usersList.length; i++) {
                if($scope.usersList[i].username == pId) {
                  $scope.usersList.splice(i,1);
                  break;
                }
              }
              $scope.inputUser = {};
            }
            else{
                messageHandlerService.notifyError(null, result.message);
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
      };

      $scope.getUser();
      $scope.getUsers();
  }]);
})();