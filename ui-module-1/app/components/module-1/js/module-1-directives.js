(function() {
'use strict';

angular.module('ui-module-1')

// This directive renders module-1
.directive('module1Ng', [function() {
    return {
        restrict: 'E',
        templateUrl: 'components/module-1/views/module-1.html'
    };
}]);
})();
