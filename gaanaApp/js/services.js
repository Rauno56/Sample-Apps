/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp.services', []).factory('Tracks', function($resource) {
    return $resource('http://104.197.128.152:8000/v1/tracks/:id', {
        id: '@id'
    });
}).factory('Genres', function($resource) {
    return $resource('http://104.197.128.152:8000/v1/genres/:id', {
        id: '@id'
    });
});