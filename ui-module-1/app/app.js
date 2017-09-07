(function() {
'use strict';

angular.module('ui-module-1', [ 'ui.router', 'ngResource'])
.config(["$urlRouterProvider", function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
})();