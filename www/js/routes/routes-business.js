var businessRoutes = angular.module('businessRoutes', []);

businessRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('business-list', {
    url: '/business-list',
    templateUrl: 'templates/business/business-list.html',
    controller: 'businessController'
  })
  .state('business-detail', {
    url: '/business-detail/:id',
    templateUrl: 'templates/business/business-detail.html',
    controller: 'businessController'
  })
  .state('business-create', {
    url: '/business-create',
    templateUrl: 'templates/business/business-create.html',
    controller: 'businessController'
  })
  .state('business-update', {
    url: '/business-update/:id',
    templateUrl: 'templates/business/business-update.html',
    controller: 'businessController'
  })
  .state('business-delete', {
    url: '/business-delete/:id',
    templateUrl: 'templates/business/business-delete.html',
    controller: 'businessController'
  })
  .state('business-settings', {
    url: '/business-settings',
    templateUrl: 'templates/business/business-settings.html',
    controller: 'businessController'
  })

  $urlRouterProvider.otherwise('/login');

}]);
