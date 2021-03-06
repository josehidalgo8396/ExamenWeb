(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('NuevoClienteCtrl', ["$scope", "ClienteService", "messageHandlerService" , "shareSessionService",
     function ($scope, clienteService, messageHandlerService, shareSessionService) {
        $scope.cliente = {};
        $scope.user = {};
        $scope.cliente.birth = new Date();
        $scope.dateSettings = {
            dateFormat:'dd-MM-yyyy',
            showRegDate: false
        }; 

        $scope.openDatePickerPopUp = function() {	
            $scope.dateSettings.showRegDate = !$scope.dateSettings.showRegDate;
            return $scope.dateSettings.showRegDate;
        };

        $scope.agregarCliente = function() {
            $scope.cliente.gender = parseInt($scope.cliente.gender);
            clienteService.newClient($scope.cliente).then(function(result) {
                if(result.success) {
					messageHandlerService.notifySuccess(null, result.message);
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
  }]);
})();