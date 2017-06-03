
(function(){
	'use strict';
	angular
		.module('ExamenWeb')
	    .controller('LoginCtrl', ['$scope', '$state', 'LoginService', 'shareSessionService', 'messageHandlerService',
	    function($scope, $state, loginService, shareSessionService, messageHandlerService){
			$scope.userData = {
				username: '',
				password: ''
			};

			var sendToHome = function() {
				$state.go('home');
			};

			var welcomeMessage = function(name) {
                var message = 'Bienvenido '+name;
                messageHandlerService.notifySuccess(null, message);
            };

			$scope.login = function(pData) {
				loginService.logIn(pData).then(function(result) {
					if(result.success) {
						var session = {username: pData.username, rol: result.data};
						shareSessionService.setSession(session);
						welcomeMessage(pData.username);
				        sendToHome();
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};
		}]);
})();
