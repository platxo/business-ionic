var authControllers = angular.module('authControllers', []);

authControllers.controller('signupController', [
  '$scope',
  '$state',
  '$location',
  'signupService',
  'loginService',
  function(
    $scope,
    $state,
    $location,
    signupService,
    loginService
  )
  {
    $scope.user = {}

    $scope.signup = function () {
      $scope.user.is_owner = true;
	    signupService.signup($scope.user)
        .$promise
          .then( function (res) {
            loginService.login($scope.user)
              .$promise
                .then( function (res) {
                  $scope.user = {}
                  window.localStorage.setItem('token', JSON.stringify(res.token));
                  window.localStorage.setItem('user', JSON.stringify(res.user));
                  $state.go('business-list');
                }, function (err) {
                  $scope.user = {}
                  $location.path('/login');
                })
          }, function (err) {
            $location.path('/signup');
          })
	  }
	}
]);

authControllers.controller('loginController', [
  '$scope',
  '$state',
  '$location',
  '$rootScope',
  'loginService',
  'signupService',
  function(
    $scope,
    $state,
    $location,
    $rootScope,
    loginService,
    signupService
  )
  {
    $scope.user = {}

    $scope.login = function() {
    loginService.login($scope.user)
      .$promise
        .then( function (res) {
          $scope.user = {}
          if (!res.user.is_owner) {
            res.user.is_owner = true;
            signupService.update(res.user)
          }
          window.localStorage.setItem('token', JSON.stringify(res.token));
          window.localStorage.setItem('user', JSON.stringify(res.user));
          $rootScope.headersJWT = {'Authorization': 'JWT ' + res.token};
          $rootScope.currentOwner = res.user.owner;
          $state.go('business-list');
        },
        function (err) {
          $scope.user = {}
        })
    }
	}
]);

authControllers.controller('forgotPasswordController', [
  '$scope',
  '$state',
  'forgotPasswordService',
  'validateService',
  'resetPasswordService',
  function(
    $scope,
    $state,
    forgotPasswordService,
    validateService,
    resetPasswordService
  )
  {
    $scope.step1 = true

    $scope.sendEmail = function (data) {
      debugger
      forgotPasswordService.send(data)
      .$promise
        .then (function (res) {
          $scope.step1 = false
          $scope.step2 = true
        }, function (err) {

        })
    }

    $scope.sendCode = function (data) {
      debugger
      validateService.send(data)
      .$promise
        .then (function (res) {
          $scope.step3= true
          $scope.step2= false
        }, function (err) {
        
        })
    }

    $scope.sendPassword = function (data) {
      resetPasswordService.send(data)
      .$promise
        .then (function (res) {
          $state.go('login')
        }, function (err) {

        })
    }

	}
]);


authControllers.controller('profileController', [
  '$scope',
  '$stateParams',
  '$state',
  function(
    $scope,
    $stateParams,
    $state
  )
  {


	}
]);
