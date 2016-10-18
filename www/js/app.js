var business = angular.module('business', [
  'ionic',
  'ngCordova',
  'firebase',
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
  if (localStorage.token) {
    $rootScope.token = JSON.parse(localStorage.getItem("token"));
    $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}
  }
  //$rootScope.token = JSON.parse(localStorage.getItem("token")) || '';
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("business")) || '';
  $rootScope.currentOwner = $rootScope.currentUser.owner || '';
  //$rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token};


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

// business.config(function() {
//   var config = {
//     apiKey: "AIzaSyDyxI50--Utf2itxIzAq7IzQS26R3VMNxY",
//     authDomain: "platxo-bi.firebaseapp.com",
//     databaseURL: "https://platxo-bi.firebaseio.com",
//     storageBucket: "platxo-bi.appspot.com",
//     messagingSenderId: "126142196573"
//   };
//   firebase.initializeApp(config);
// });

// business.config(['$httpProvider', function($httpProvider) {
//     httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
//
//     $httpProvider.defaults.headers.patch = {
//     'Content-Type': 'application/json;charset=utf-8'
//     };
// }]);
