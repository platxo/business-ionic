var businessServices = angular.module('businessServices', ['ngResource']);

businessServices.service('businessService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var businessUrl = '/api/business/';
  return $resource($rootScope.version + $rootScope.baseUrl + businessUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);

businessServices.service('sizesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var sizesUrl = '/api/parametrizations/size_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + sizesUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

businessServices.service('countriesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var countriesUrl = '/api/parametrizations/country_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + countriesUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

businessServices.service('currenciesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var currenciesUrl = '/api/parametrizations/currency_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + currenciesUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

businessServices.service('crmPointsService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var crmPointsUrl = '/api/parametrizations/crm_points_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + crmPointsUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

businessServices.service('categoriesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var categoriesUrl = '/api/parametrizations/category_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + categoriesUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);

businessServices.service('typesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var typesUrl = '/api/parametrizations/type_choices/';
  return $resource($rootScope.version + $rootScope.baseUrl + typesUrl +'?format=json', {},{
    get : { method: 'GET', headers: $rootScope.headersJWT },
  });
}]);
