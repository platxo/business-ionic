var authServices = angular.module('authServices', ['ngResource']);

var version = 'http://development.';
var baseUrl = 'platxo-bi.appspot.com';
var signupUrl = '/api/users';
var loginUrl = '/api-token-auth/';

authServices.service('signupService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + signupUrl +':id/?format=json', {},{
    signup: { method: 'POST' }
  });
}]);

authServices.service('loginService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + loginUrl +'?format=json', {},{
    login: { method: 'POST' }
  });
}]);
