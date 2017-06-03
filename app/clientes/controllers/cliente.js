(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('NuevoClienteCtrl', ["$scope", "messageHandlerService" , "shareSessionService","confirmationModalService",
     function ($scope, messageHandlerService, shareSessionService,confirmationModalService) {
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

        $scope.getUser = function() {
            var session = shareSessionService.getSession();
            $scope.user.usuario = session.usuario;
            $scope.user.rol = session.rol;
        };

        $scope.getUser();
  }]);
})();