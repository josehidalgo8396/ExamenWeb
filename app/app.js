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
    });
})();