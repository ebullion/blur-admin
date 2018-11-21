'use strict';

angular.module('admin', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',

    'admin.theme',
    'admin.pages',
    'interceptors.auth'
]).config(appConfig);

function appConfig($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}