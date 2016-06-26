/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp', ['ui.router', 'ngResource', 'gaanaApp.services', 'gaanaApp.controllers', 'gaanaApp.filters', 'gaanaApp.directives']);
angular.module('gaanaApp').config(function($stateProvider) {
    $stateProvider.state('tracks', {
        url: '/tracks',
        templateUrl: 'partials/tracks.html',
        controller: 'TracksListController'
    }).state('track-genres', {
        url: '/track-genres',
        templateUrl: 'partials/track-genres.html',
        controller: 'TrackGenresViewController',
        params: {
            trackGenres: null
        }
    }).state('genres', {
        url: '/genres',
        templateUrl: 'partials/genres.html',
        controller: 'GenresViewController'
    });
}).run(function($state) {
    $state.go('tracks');
});