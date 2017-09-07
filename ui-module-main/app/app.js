(function() {
'use strict';

angular.module('ui-module-main', [ 'ui.router', 'ngResource', 'templates' ])
.config(["$urlRouterProvider", function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
})();