var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.service('dataService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var datasUrl = '/api/datas/';
  return $resource($rootScope.version + $rootScope.baseUrl + datasUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);

dataServices.service('tagsService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var tagsUrl = '/api/parametrizations/tag_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + tagsUrl +':id/?format=json', {id: '@id'},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

dataServices.service('analyticsService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var anlalyticsUrl = '/api/analytics/';
  return $resource($rootScope.version + $rootScope.baseUrl + anlalyticsUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);
