var businessRoutes = angular.module('businessRoutes', []);

businessRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('business-list', {
    url: '/business-list',
    templateUrl: 'templates/business/business-list.html',
    controller: 'businessListCtrl'
  })
  .state('business-detail', {
    url: '/business-detail/:id',
    templateUrl: 'templates/business/business-detail.html',
    controller: 'businessDetailCtrl'
  })
  .state('business-create', {
    url: '/business-create',
    templateUrl: 'templates/business/business-create.html',
    controller: 'businessCreateCtrl'
  })
  .state('business-update', {
    url: '/business-update/:id',
    templateUrl: 'templates/business/business-update.html',
    controller: 'businessUpdateCtrl'
  })
  .state('business-delete', {
    url: '/business-delete/:id',
    templateUrl: 'templates/business/business-delete.html',
    controller: 'businessDeleteCtrl'
  })

  $urlRouterProvider.otherwise('/login');

}]);
