var authServices = angular.module('authServices', ['ngResource']);

var version = 'http://development.';
var baseUrl = 'platxo-bi.appspot.com';
var signupUrl = '/api/users';
var loginUrl = '/api-auth/login';

authServices.service('signupService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + signupUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' },
    token: { method: 'GET' },
    signup: { method: 'POST' }
  });
}]);

authServices.service('loginService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + loginUrl +':user/?format=json', {},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' },
    token: { method: 'GET' },
    login: { method: 'POST' }
  });
}]);

authServices.service('forgotPasswordService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + authUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
