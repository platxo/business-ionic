var settingsRoutes = angular.module('settingsRoutes', []);

settingsRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('settings-list', {
    url: '/settings-list',
    templateUrl: 'templates/settings/settings-list.html',
    controller: 'settingsController'
  })
  .state('settings-crm-points', {
    url: '/settings-crm-points',
    templateUrl: 'templates/settings/settings-crm-points.html',
    controller: 'settingsController'
  })
  .state('settings-taxes', {
    url: '/settings-taxes',
    templateUrl: 'templates/settings/settings-taxes.html',
    controller: 'settingsController'
  })
  .state('settings-schedule', {
    url: '/settings-schedule',
    templateUrl: 'templates/settings/settings-schedule.html',
    controller: 'settingsController'
  })
  .state('settings-card', {
    url: '/settings-card',
    templateUrl: 'templates/settings/settings-card.html',
    controller: 'settingsController'
  })
  .state('settings-contact', {
    url: '/settings-contact',
    templateUrl: 'templates/settings/settings-contact.html',
    controller: 'settingsController'
  })

  $urlRouterProvider.otherwise('/login');

}]);
