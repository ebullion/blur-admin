/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('admin.pages.charts', [
      'admin.pages.charts.amCharts',
      'admin.pages.charts.chartJs',
      'admin.pages.charts.chartist',
      'admin.pages.charts.morris'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts', {
          url: '/charts',
          abstract: true,
          template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
          title: 'Charts',
          sidebarMeta: {
            icon: 'ion-cash',
            order: 400,
          },
        });
  }

})();
