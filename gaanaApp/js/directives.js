/**
 * Created by Ankush Mehta (stack-amehta)
 */
angular.module('gaanaApp.directives', []).directive('paginationControl', function() {
    return {
        templateUrl: 'partials/pagination.html',
        restrict: 'E',
        scope: {
            pageSize: '=',
            totalData: '=',
            currentPage: '=',
        },
        link: function(scope, element, attrs) {},
        controller: function($scope, $element) {
            $scope.showNextPage = function(currentPage) {
                $scope.currentPage += 1;
                $scope.$parent.$parent.currentPage += 1;
            }
            $scope.showPrevPage = function() {
                $scope.currentPage -= 1;
                $scope.$parent.$parent.currentPage -= 1;
            }
            $scope.getNumberOfPages = function() {
                return Math.ceil($scope.totalData.length / $scope.pageSize);
            }
        }
    };
});