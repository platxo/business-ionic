var authRoutes = angular.module('authRoutes', []);

authRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/auth/auth-signup.html',
    controller: 'signupController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/auth/auth-login.html',
    controller: 'loginController'
  })
  .state('forgotpassword', {
    url: '/forgot-password',
    templateUrl: 'templates/auth/auth-forgot-password.html',
    controller: 'forgotPasswordController'
  })

  $urlRouterProvider.otherwise('/login');

}]);

// .state('signup', {
//   url: '/signup',
//   views: {
//     'view-login': {
//       templateUrl: 'templates/auth/auth-signup.html',
//       controller: 'signupController'
//     }
//   }
// })
// .state('login', {
//   url: '/login',
//   views: {
//     'view-login': {
//       templateUrl: 'templates/auth/auth-login.html',
//       controller: 'loginController'
//     }
//   }
// })
// .state('forgotpassword', {
//   url: '/forgot-password',
//   views: {
//     'view-forgot-pasword': {
//       templateUrl: 'templates/auth/auth-forgot-password.html',
//       controller: 'forgotPasswordController'
//     }
//   }
// })
