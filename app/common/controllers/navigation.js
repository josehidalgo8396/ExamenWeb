
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
                    name: "Nuevo Cliente",
                    link: "nuevo-cliente"
                },
                {
                    name: "Gestion de Clientes",
                    link: "gestionar-clientes"
                }
            ];

            $scope.productos = [
                {
                    name: "Nuevo Producto",
                    link: "nuevo-producto"
                },
                {
                    name: "Gestionar Productos",
                    link: "gestionar-productos"
                }
            ];

            $scope.inventario = [
                {
                    name: "Nuevo Inventario",
                    link: "nuevo-inventario"
                },
                {
                    name: "Gestionar Inventarios",
                    link: "gestionar-inventario"
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

