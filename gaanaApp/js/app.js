/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp', ['ui.router', 'ngResource', 'gaanaApp.controllers', 'gaanaApp.services']);
angular.module('gaanaApp').config(function($stateProvider, $httpProvider) {
    $stateProvider.state('tracks', {
        url: '/tracks',
        templateUrl: 'partials/tracks.html',
        controller: 'TracksListController'
    }).state('genres', {
        url: '/genres',
        templateUrl: 'partials/genres.html',
        controller: 'GenresViewController'
    });
}).run(function($state) {
    $state.go('tracks');
});