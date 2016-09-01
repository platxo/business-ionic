var authServices = angular.module('authServices', ['ngResource']);

authServices.service('signupService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var version = $rootScope.version;
  var baseUrl = 'platxo-bi.appspot.com';
  var signupUrl = '/api/users';
  return $resource(version + baseUrl + signupUrl +':id/?format=json', {},{
    signup: { method: 'POST' }
  });
}]);

authServices.service('loginService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var version = $rootScope.version;
  var baseUrl = 'platxo-bi.appspot.com';
  var loginUrl = '/api-token-auth/';
  return $resource(version + baseUrl + loginUrl +'?format=json', {},{
    login: { method: 'POST' }
  });
}]);
