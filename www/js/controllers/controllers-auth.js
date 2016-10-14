var authControllers = angular.module('authControllers', []);

authControllers.controller('signupController', [
  '$scope',
  '$state',
  'signupService',
  'loginService',
  function(
    $scope,
    $state,
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
                  $state.go('login');
                })
          }, function (err) {
            $state.go('signup');
          })
	  }
	}
]);

authControllers.controller('loginController', [
  '$scope',
  '$state',
  '$rootScope',
  'loginService',
  'signupService',
  function(
    $scope,
    $state,
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
          window.localStorage.setItem('token', JSON.stringify(res.token));
          window.localStorage.setItem('user', JSON.stringify(res.user));
          if (!res.user.is_owner) {
            res.user.is_owner = true;
            signupService.update(res.user)
              .$promise
                .then( function (res) {
                  $rootScope.currentOwner = res.owner;
                  $state.go('business-list');
                }, function (err) {

                })
          }
          $rootScope.currentOwner = res.user.owner;
          $state.go('business-list');
        },
        function (err) {
          $scope.user = {}
          $state.go('login');
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
      $scope.email = data.email
      forgotPasswordService.send(data)
      .$promise
        .then (function (res) {
          $scope.step1 = false
          $scope.step2 = true
        }, function (err) {
          $scope.email = ''
        })
    }

    $scope.sendCode = function (data) {
      data.email = $scope.email;
      validateService.send(data)
      .$promise
        .then (function (res) {
          $scope.forgotToken = res.token
          $scope.step3 = true
          $scope.step2 = false
        }, function (err) {

        })
    }

    $scope.sendPassword = function (data) {
      data.token = $scope.forgotToken
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

authControllers.controller('GoogleCtrl', [
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

authControllers.controller('FacebookCtrl', [
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
