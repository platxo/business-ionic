var informationServices = angular.module('informationServices', ['ngResource']);


informationServices.service('informationService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var informationsUrl = '/api/informations/';
  return $resource($rootScope.version + $rootScope.baseUrl + informationsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
