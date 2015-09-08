var app = angular.module('downloadApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state(
      'home', {
      url: '/',
      templateUrl: 'partials/login.html'
  })
    .state(
      'installs1', {
      url: '/page1',
      templateUrl: 'partials/installs1.html',
      controller: 'CheckboxCtrl'
  })
    .state(
      'installs2', {
      url: '/page2',
      templateUrl: 'partials/installs2.html'
  })
    .state(
      'installs3', {
      url: '/page3',
      templateUrl: 'partials/installs3.html'
  })
    .state(
      'mac-installs4', {
      url: '/mac4',
      templateUrl: 'partials/mac-installs4.html'
  })
    .state(
      'win-installs4', {
      url: '/win4',
      templateUrl: 'partials/win-installs4.html'
  })
    .state(
      'win-installs5', {
      url: '/win5',
      templateUrl: 'partials/win-installs5.html'
  })
    .state(
      'game', {
        url: '/game',
        templateUrl: 'partials/game.html',
        controller: 'GameCtrl',
        cache: false
    })
})