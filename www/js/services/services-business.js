var businessServices = angular.module('businessServices', ['ngResource']);

businessServices.service('businessService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var businessUrl = '/api/business/';
  return $resource($rootScope.version + $rootScope.baseUrl + businessUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);

businessServices.service('employeesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var employeesUrl = '/api/employees/';
  return $resource($rootScope.version + $rootScope.baseUrl + employeesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
