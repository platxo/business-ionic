// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var business = angular.module('business', [
  'ionic',
  'ngCordova',
  'authControllers',
  'authServices',
  'authRoutes',
  'dataControllers',
  'dataServices',
  'dataRoutes',
  'informationControllers',
  'informationServices',
  'informationRoutes',
  'knowledgeControllers',
  'knowledgeServices',
  'knowledgeRoutes'
])

business.run(function($ionicPlatform, $rootScope, $location) {
  $ionicPlatform.ready(function() {
    $rootScope.token = JSON.parse(localStorage.getItem("token"));
    $rootScope.currentUser = JSON.parse(localStorage.getItem("user"));
    $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token};
    $rootScope.logout = function() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      $location.path('/login');
    };
    $rootScope.version = 'http://development.'

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// business.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
// }]);
