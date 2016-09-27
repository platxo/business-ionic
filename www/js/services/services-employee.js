var employeeServices = angular.module('employeeServices', ['ngResource']);

employeeServices.service('employeesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var employeesUrl = '/api/employees/';
  return $resource($rootScope.version + $rootScope.baseUrl + employeesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);
