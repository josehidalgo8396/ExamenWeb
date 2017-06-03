
 (function(){
    'use strict';
    angular
        .module('ExamenWeb')
        .controller('NavegacionCtrl',['$scope','shareSessionService', 'messageHandlerService', '$state',  
        function ($scope, shareSessionService, messageHandlerService, $state) {
            $scope.user = {};   
            $scope.sesion = [
                {
                    name: "Cerrar Sesión",
                    link: "logout"
                }
            ];

            $scope.clientes = [
                {
                    name: "Gestion de Clientes",
                    link: "gestionar-clientes"
                },
                {
                    name: "Nuevo Cliente",
                    link: "nuevo-cliente"
                }
            ];

            $scope.productos = [
                {
                    name: "Agregar Cupón",
                    link: "nuevo-cupon"
                },
                {
                    name: "Gestionar Cupones",
                    link: "gestionar-cupones"
                }
            ];

            $scope.inventario = [
                {
                    name: "Agregar Promoción",
                    link: "nueva-promocion"
                },
                {
                    name: "Gestionar Promociones",
                    link: "gestionar-promociones"
                }
            ];

            $scope.usuarios = [
                {
                    name: "Gestionar Usuarios",
                    link: "gestionar-usuarios"
                }
            ];

            $scope.getUser = function() {
                if(shareSessionService.isStartSession()) {
                    var session = shareSessionService.getSession();
                    $scope.user.usuario = session.usuario;
                    $scope.user.rol = session.rol;
                }
                else{
                    $state.go("login");
                }  
            };

            $scope.getUser();
         
        }]);    
})();

