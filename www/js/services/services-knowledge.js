var knowledgeServices = angular.module('knowledgeServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var knowledgesUrl = '/api/knowledges/';

knowledgeServices.service('knowledgeService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + knowledgesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
