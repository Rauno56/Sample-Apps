/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp.services', []).factory('Tracks', function($resource) {
    return $resource('http://104.197.128.152:8000/v1/tracks', {
        id: '@id'
    }, {
        search: {
            method: 'GET'
        }
    }, {
        addNew: {
            method: 'POST',
            isArray: false
        }
    }, {
        getByID: {
            method: 'GET',
            url: 'http://104.197.128.152:8000/v1/tracks/:id'
        }
    }, {
        editByID: {
            method: 'POST',
            url: 'http://104.197.128.152:8000/v1/tracks/:id',
            isArray: false
        }
    });
}).factory('Genres', function($resource) {
    return $resource('http://104.197.128.152:8000/v1/genres', {
        id: '@id'
    }, {
        getByID: {
            method: 'GET',
            url: 'http://104.197.128.152:8000/v1/genres/:id'
        }
    }, {
        editByID: {
            method: 'POST',
            url: 'http://104.197.128.152:8000/v1/genres/:id',
            isArray: false
        }
    }, {
        addNew: {
            method: 'POST',
            isArray: false
        }
    });
});