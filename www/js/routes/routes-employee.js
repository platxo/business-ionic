var employeeRoutes = angular.module('employeeRoutes', []);

employeeRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('employee-list', {
    url: '/employee-list',
    templateUrl: 'templates/employee/employee-list.html',
    controller: 'employeeCtrl'
  })
  .state('employee-add', {
    url: '/employee-add',
    templateUrl: 'templates/employee/employee-add.html',
    controller: 'employeeCtrl'
  })
  .state('employee-remove', {
    url: '/employee-remove',
    templateUrl: 'templates/employee/employee-remove.html',
    controller: 'employeeCtrl'
  })
  .state('employee-profile', {
    url: '/employee-profile/:id',
    templateUrl: 'templates/employee/employee-profile.html',
    controller: 'employeeProfileCtrl'
  })

  $urlRouterProvider.otherwise('/login');

}]);
