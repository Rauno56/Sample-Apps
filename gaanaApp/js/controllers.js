/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp.controllers', []).controller('TracksListController', function($scope, $state, $window, Tracks) {
    $scope.init = init;
    $scope.addNewTrack = addNewTrack;
    $scope.getTrackByID = getTrackByID;
    $scope.editTrackByID = editTrackByID;
    $scope.searchTrackByTitle = searchTrackByTitle;

    function init() {
        $scope.tracksList = Tracks.query();
    }

    function searchTrackByTitle() {
        Tracks.editByID({
            title: 'dj wale babu'
        });
    }

    function addNewTrack() {
        var paramObj = {};
        Tracks.addNew({}, paramObj);
    }

    function getTrackByID() {
        Tracks.getByID({
            id: 1
        });
    }

    function editTrackByID() {
        Tracks.editByID({
            id: 1
        });
    }
}).controller('GenresViewController', function($scope, $stateParams, Genres) {
    $scope.init = init;
    $scope.addNewGenre = addNewGenre;
    $scope.getGenreByID = getGenreByID;
    $scope.editGenreByID = editGenreByID;

    function init() {
        $scope.genresList = Genres.query();
    }

    function addNewGenre() {
        var paramObj = {};
        Genres.addNew({}, paramObj);
    }

    function getGenreByID() {
        Genres.getByID({
            id: 1
        });
    }

    function editGenreByID() {
        Genres.editByID({
            id: 1
        });
    }
});