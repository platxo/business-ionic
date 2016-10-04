var settingsServices = angular.module('settingsServices', ['ngResource']);

settingsServices.service('crmPointsService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var crmPointsUrl = '/api/parametrizations/crm_points_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + crmPointsUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

settingsServices.service('taxService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var taxUrl = '/api/taxes/';
  return $resource($rootScope.version + $rootScope.baseUrl + taxUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
