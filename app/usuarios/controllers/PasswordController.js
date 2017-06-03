(function() {
	"use strict";
	angular
		.module("ExamenWeb")
		.controller("PasswordCtrl", ["$scope", "PasswordService", "shareSessionService", "messageHandlerService", function($scope, passwordService, shareSessionService, messageHandlerService) {
			$scope.inputUser = {};
			$scope.updatePassword = function(inputUser) {
				passwordService.changePassword(inputUser).then(function(result) {
					if(result.success) {
						messageHandlerService.notifySuccess(null, result.message)
					}
					else{
           				messageHandlerService.notifyError(null, result.message)
					}
				});
			};

			$scope.getUser = function() {
				var session = shareSessionService.getSession();
        		$scope.inputUser.usuario = session.usuario;
        		$scope.inputUser.rol = session.rol;
			};

			$scope.getUser();
		}]);
})();