var employeeRoutes = angular.module('employeeRoutes', []);

employeeRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('employee-list', {
    url: '/employee-list',
    templateUrl: 'templates/employee/employee-list.html',
    controller: 'employeeController'
  })
  .state('employee-add', {
    url: '/employee-add',
    templateUrl: 'templates/employee/employee-add.html',
    controller: 'employeeController'
  })
  .state('employee-remove', {
    url: '/employee-remove',
    templateUrl: 'templates/employee/employee-remove.html',
    controller: 'employeeController'
  })
  .state('employee-profile', {
    url: '/employee-profile',
    templateUrl: 'templates/employee/employee-profile.html',
    controller: 'employeeController'
  })

  $urlRouterProvider.otherwise('/login');

}]);
