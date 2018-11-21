/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('admin.pages.ui', [
    'admin.pages.ui.typography',
    'admin.pages.ui.buttons',
    'admin.pages.ui.icons',
    'admin.pages.ui.modals',
    'admin.pages.ui.grid',
    'admin.pages.ui.alerts',
    'admin.pages.ui.progressBars',
    'admin.pages.ui.notifications',
    'admin.pages.ui.tabs',
    'admin.pages.ui.slider',
    'admin.pages.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
