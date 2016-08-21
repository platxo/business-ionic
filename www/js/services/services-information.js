var informationServices = angular.module('informationServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var informationsUrl = '/api/informations/';

informationServices.service('informationService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + informationsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
