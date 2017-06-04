(function(){
  'use strict';
  angular
    .module('ExamenWeb', [
      'ui.router',
      'ui-notification',
      'ui.bootstrap',
      'ui.navbar'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

      //muestra esta vista por defecto
      //redirecciona en caso de nos reconocer la ruta ingresada
      $urlRouterProvider.otherwise('/login');

      $stateProvider
        //vista abstracta sobre la que se carga las demás vistas principales
        .state('base', {
          abstract: true,
          url: '',
          templateUrl: 'common/views/base.html'
        })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'login/views/login.html',
          controller: 'LoginCtrl'
        })
        .state('logout', {
          controller: 'LogoutCtrl'
        })
        .state('home', {
          url: '/home',
          parent: 'base',
          templateUrl: 'common/views/home.html'
        })
        .state('gestionar-usuarios', {
          url: '/gestionar-usuarios',
          parent: 'home',
          templateUrl: 'usuarios/views/gestionar-usuarios.html',
          controller: 'GestionUsuariosCtrl'
        })
        .state('nuevo-cliente', {
          url: '/nuevo-cliente',
          parent: 'home',
          templateUrl: 'clientes/views/nuevo-cliente.html',
          controller: 'NuevoClienteCtrl'
        })
        .state('gestionar-clientes', {
          url: '/gestionar-clientes',
          parent: 'home',
          templateUrl: 'clientes/views/gestionar-clientes.html',
          controller: 'GestionClienteCtrl'
        })
        .state('editar-cliente', {
          url: '/editar-cliente',
          parent: 'home',
          templateUrl: 'clientes/views/editar-cliente.html',
          controller: 'EditarClienteCtrl'
        })
        .state('nuevo-producto', {
          url: '/nuevo-producto',
          parent: 'home',
          templateUrl: 'productos/views/nuevo-producto.html',
          controller: 'NuevoProductoCtrl'
        })
        .state('gestionar-productos', {
          url: '/gestionar-productos',
          parent: 'home',
          templateUrl: 'productos/views/gestionar-productos.html',
          controller: 'GestionProductosCtrl'
        })
        .state('editar-producto', {
          url: '/editar-producto',
          parent: 'home',
          templateUrl: 'productos/views/editar-producto.html',
          controller: 'EditarProductoCtrl'
        })
        .state('nuevo-inventario', {
          url: '/nuevo-inventario',
          parent: 'home',
          templateUrl: 'inventario/views/nuevo-inventario.html',
          controller: 'NuevoInventarioCtrl'
        })
        .state('gestionar-inventario', {
          url: '/gestionar-inventario',
          parent: 'home',
          templateUrl: 'inventario/views/gestionar-inventario.html',
          controller: 'GestionInventarioCtrl'
        })
        .state('editar-inventario', {
          url: '/editar-inventario',
          parent: 'home',
          templateUrl: 'inventario/views/editar-inventario.html',
          controller: 'EditarInventarioCtrl'
        })
    });
})();