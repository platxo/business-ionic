var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.service('dataService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var version = $rootScope.version;
  var baseUrl = 'platxo-bi.appspot.com';
  var datasUrl = '/api/datas/';
  return $resource(version + baseUrl + datasUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT},
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
