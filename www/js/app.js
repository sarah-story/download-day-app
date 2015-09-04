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
      'game', {
        url: '/game',
        templateUrl: 'partials/game.html'
      })
})