var dataServices = angular.module('dataServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var datasUrl = '/api/datas/';

dataServices.service('dataService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + datasUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    detail: { method: 'GET', headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    create: { method: 'POST', headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    update: { method: 'PUT', headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    delete: { method: 'DELETE', headers: { 'Authorization': 'JWT ' + $rootScope.token	} }
  });
}]);
