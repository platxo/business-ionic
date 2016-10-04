var business = angular.module('business', [
  'ionic',
  'ngCordova',
  'authControllers',
  'authServices',
  'authRoutes',
  'authDirectives',
  'businessControllers',
  'businessServices',
  'businessRoutes',
  'businessFilters',
  'businessDirectives',
  'employeeControllers',
  'employeeServices',
  'employeeRoutes',
  'settingsControllers',
  'settingsServices',
  'settingsRoutes',
  'dataControllers',
  'dataServices',
  'dataRoutes',
  'informationControllers',
  'informationServices',
  'informationRoutes',
  'knowledgeControllers',
  'knowledgeServices',
  'knowledgeRoutes',
  'calculatorControllers',
  'calculatorServices',
  'calculatorDirectives',
  'menuDirectives'
])

business.run(function($ionicPlatform, $rootScope) {
  $rootScope.version = 'http://development.';
  $rootScope.baseUrl = 'platxo-bi.appspot.com';
  // $rootScope.version = 'http://localhost';
  // $rootScope.baseUrl = ':8080';
  $rootScope.token = JSON.parse(localStorage.getItem("token")) || '';
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("bs")) || '';
  $rootScope.currentOwner = $rootScope.currentUser.owner || '';
  $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token};


  $ionicPlatform.ready(function() {

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
//     httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
//
//     $httpProvider.defaults.headers.patch = {
//     'Content-Type': 'application/json;charset=utf-8'
//     };
// }]);
