(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('GestionClienteCtrl', ["$scope", "$state", "ClienteService", "messageHandlerService" , "shareSessionService","$uibModal","confirmationModalService", "ShareClientService", 
     function ($scope, $state, clienteService, messageHandlerService, shareSessionService, $uibModal,confirmationModalService, shareClientService) {
  
        $scope.user = {};
        $scope.clientList = [];

        $scope.getClients = function(){
            clienteService.getClients().then(function(result) {
                if (result.success){
                    $scope.clientList = result.data;
                }
                else{
                    messageHandlerService.notifyWarning(null, result.message);
                }
            }); 
        };

        $scope.getUser = function() {
            var session = shareSessionService.getSession();
            $scope.user.usuario = session.usuario;
            $scope.user.rol = session.rol;
        };

        
        $scope.sendToUpdateClientView = function(pId) {
            shareClientService.setClientId(pId);
            $state.go('editar-cliente');
        };

        $scope.disableClient = function(pId) {
            $scope.openConfirmationModal(function(response){
                if (!response.success){
                    return;
                }
                var data = {id: pId};
                clienteService.disableClient(data).then(function(result) {
                    if(result.success) {
                        for(var i=0; i<$scope.clientList.length; i++) {
                            if($scope.clientList[i].idnumber == pId){
                                $scope.clientList.splice(i,1);
                                break;
                            }
                        }
                        messageHandlerService.notifySuccess(null, result.message);
                    }
                    else {
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                });
            });
        };

        var setModalContent = function(mTitle, mMessage){
            confirmationModalService.setModalContent(mTitle, mMessage);
        };

        $scope.openConfirmationModal = function (callback) {
            setModalContent('Deshabilitar Cliente', '¿Está seguro(a) de que desea deshabilitar el cliente?');
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
        $scope.getClients();

  }]);
})();