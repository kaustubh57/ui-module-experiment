(function() {
'use strict';

angular.module('ui-module-main', [ 'ui.router', 'ngResource', 'templates', 'ui-module-1' ])
.config(["$urlRouterProvider", function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
})();