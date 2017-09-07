(function() {
'use strict';

angular.module('ui-module-main')

// This directive renders main page
.directive('mainNg', [function() {
    return {
        restrict: 'E',
        templateUrl: 'components/main/views/main.html'
    };
}]);
})();
