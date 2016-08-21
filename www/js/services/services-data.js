var dataServices = angular.module('dataServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var datasUrl = '/api/datas/';

dataServices.service('dataService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + datasUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
