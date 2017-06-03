(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('EditarClienteCtrl', ["$scope", "ClienteService", "messageHandlerService", "shareSessionService", "ShareClientService",
     function ($scope, clienteService, messageHandlerService, shareSessionService, shareClientService) {
        $scope.cliente = {};
        $scope.user = {};
        $scope.dateSettings = {
            dateFormat:'dd-MM-yyyy',
            showRegDate: false
        }; 

        $scope.openDatePickerPopUp = function() {	
            $scope.dateSettings.showRegDate = !$scope.dateSettings.showRegDate;
            return $scope.dateSettings.showRegDate;
        };

        $scope.editarCliente = function() {
            $scope.cliente.gender = parseInt($scope.cliente.gender);
            clienteService.editClient($scope.cliente).then(function(result) {
                if(result.success) {
                    $scope.cliente.gender = $scope.cliente.gender.toString();
					messageHandlerService.notifySuccess(null, result.message);
                }
                else{
					messageHandlerService.notifyError(null, result.message);
                }
            });
        };

        $scope.getClient = function() {
            var id = shareClientService.getClientId();
            clienteService.getClient(id).then(function(result) {
                if(result.success) {
                    $scope.cliente = result.data;
                    $scope.cliente.gender = $scope.cliente.gender.toString();
                }
                else{
                    messageHandlerService.notifyError(null, result.message);
                }
            });
        };

        $scope.getUser = function() {
            var session = shareSessionService.getSession();
            $scope.user.usuario = session.usuario;
            $scope.user.rol = session.rol;
        };

        $scope.getUser();
        $scope.getClient();
  }]);
})();