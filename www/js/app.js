var app = angular.module('downloadApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state(
      'home', {
      url: '#/',
      templateUrl: 'partials/logo.html'
  })
    .state(
      'installs1', {
      url: '#/1',
      templateUrl: 'partials/installs1.html'
  })
    .state(
      'installs2', {
      url: '/2',
      templateUrl: 'partials/installs2.html'
  })
    .state(
      'mac-installs', {
      url: '/mac3',
      templateUrl: 'partials/mac-installs.html'
  })
    .state(
      'win-installs', {
      url: '/win3',
      templateUrl: 'partials/win-installs.html'
  })
    })
    .state(
      'game', {
        url: '/game',
        templateUrl: 'partials/game.html',
        controller: 'GameCtrl',
        cache: false
    })
})