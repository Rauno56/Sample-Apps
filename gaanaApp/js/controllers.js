/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp.controllers', []).controller('GenresViewController', function($scope, $state, $timeout, Genres) {
    $scope.init = init;
    $scope.editGenre = editGenre;
    $scope.addNewGenre = addNewGenre;
    $scope.showEditGenreDialog = showEditGenreDialog;
    $scope.showHideNewGenreDialog = showHideNewGenreDialog;

    function init() {
        $scope.pageSize = 5;
        $scope.newGenre = {};
        $scope.currentPage = 0;
        $scope.bNewGenre = false;
        $scope.genresList = null;
        $scope.editGenreObject = {};
        $timeout(function() {
            $scope.genresList = Genres.query();
        }, 1000);
    }

    function addNewGenre() {
        showHideNewGenreDialog();
        var paramObj = {
            name: $scope.newGenre.name
        };
        Genres.save({}, paramObj).$promise.then(function() {
            alertify.success('Added New Genre');
        }, function(err) {
            alertify.error('Error: ' + err.statusText);
        });
    }

    function editGenre() {
        hideEditGenreDialog();
        var paramObj = {
            name: $scope.editGenreObject.name
        }
        Genres.save({
            id: $scope.editGenreObject.id
        }, paramObj).$promise.then(function() {
            alertify.success('Changes Saved!');
        }, function(err) {
            alertify.error('Error: ' + err.statusText);
        });
    }

    function showHideNewGenreDialog() {
        $scope.bNewGenre = !$scope.bNewGenre;
    }

    function showEditGenreDialog(genre) {
        $scope.editGenreObject = genre;
        if (!$scope.bEditGenre) {
            $scope.bEditGenre = true;
        }
    }

    function hideEditGenreDialog(Genre) {
        if ($scope.bEditGenre) {
            $scope.bEditGenre = false;
        }
    }
}).controller('TracksListController', function($scope, $state, $timeout, Tracks, Genres) {
    $scope.init = init;
    $scope.editTrack = editTrack;
    $scope.addNewTrack = addNewTrack;
    $scope.showGenreView = showGenreView;
    $scope.searchTrackByTitle = searchTrackByTitle;
    $scope.showEditTrackDialog = showEditTrackDialog;
    $scope.showHideNewTrackDialog = showHideNewTrackDialog;

    function init() {
        $scope.pageSize = 5;
        $scope.newTrack = {};
        $scope.currentPage = 0;
        $scope.tracksList = null;
        $scope.bNewTrack = false;
        $scope.trackToSearch = null;
        $scope.editTrackObject = {};
        $timeout(function() {
            $scope.tracksList = Tracks.query();
        }, 1000);
    }

    function searchTrackByTitle() {
        $scope.tracksList = null;
        $scope.currentPage = 0;
        if ($scope.trackToSearch) {
            $scope.tracksList = Tracks.query({
                title: $scope.trackToSearch
            });
        } else {
            console.log('trackToSearch undefined!');
        }
    }

    function addNewTrack() {
        showHideNewTrackDialog();
        var paramObj = {
            title: $scope.newTrack.title,
            // genres: $scope.newTrack.genres,
            // genres: $scope.newTrack.genres.split(','),
            rating: $scope.newTrack.rating,
        };
        Tracks.save({}, paramObj).$promise.then(function() {
            alertify.success('Added New Track');
        }, function(err) {
            alertify.error('Error: ' + err.statusText);
        });
    }
    function editTrack() {

        hideEditTrackDialog();
        var paramObj = {
            title: $scope.editTrackObject.title,
            // genres: $scope.editTrackObject.genres,
            rating: $scope.editTrackObject.rating,
        }
        Tracks.save({
            id: $scope.editTrackObject.id
        }, paramObj).$promise.then(function() {
            alertify.success('Changes Saved!');
        }, function(err) {
            alertify.error('Error: ' + err.statusText);
        });
    }

    function showGenreView(genresList) {
        $state.go('track-genres', {
            trackGenres: genresList
        }, {
            reload: true
        });
    }

    function showHideNewTrackDialog() {
        if ($scope.genresList === undefined) {
            $scope.genresList = Genres.query();
        }
        $scope.bNewTrack = !$scope.bNewTrack;
    }

    function showEditTrackDialog(track) {
        if ($scope.genresList === undefined) {
            $scope.genresList = Genres.query();
        }
        $scope.editTrackObject = track;
        if (!$scope.bEditTrack) {
            $scope.bEditTrack = true;
        }
    }

    function hideEditTrackDialog(track) {
        if ($scope.bEditTrack) {
            $scope.bEditTrack = false;
        }
    }
}).controller('TrackGenresViewController', function($scope, $state, $stateParams, $window, Genres) {
    $scope.init = init;
    $scope.navigateBack = navigateBack;

    function init() {
        $scope.pageSize = 3;
        $scope.currentPage = 0;
        if ($stateParams.trackGenres === null) {
            $state.go('tracks');
        } else {
            $scope.trackGenres = $stateParams.trackGenres;
        }
    }

    function navigateBack() {
        $window.history.back();
    }
});