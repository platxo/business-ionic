var authServices = angular.module('authServices', ['ngResource']);

authServices.service('signupService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var signupUrl = '/api/users';
  return $resource($rootScope.version + $rootScope.baseUrl + signupUrl +':id/?format=json', {},{
    signup: { method: 'POST' }
  });
}]);

authServices.service('loginService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var loginUrl = '/api-token-auth/';
  return $resource($rootScope.version + $rootScope.baseUrl + loginUrl +'?format=json', {},{
    login: { method: 'POST' }
  });
}]);
