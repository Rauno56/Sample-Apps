/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp.filters', []).filter('startFrom', function() {
    return function(input, start) {
        // parse to int
        start = parseInt(start);
        return input.slice(start);
    }
});