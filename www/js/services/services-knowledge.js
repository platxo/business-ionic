var knowledgeServices = angular.module('knowledgeServices', ['ngResource']);

knowledgeServices.service('knowledgeService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var version = $rootScope.version;
  var baseUrl = 'platxo-bi.appspot.com';
  var knowledgesUrl = '/api/knowledges/';
  return $resource(version + baseUrl + knowledgesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
