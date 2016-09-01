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
	    signupService.signup($scope.user)
        .$promise
          .then( function (res) {
            console.log(res);
            loginService.login($scope.user)
              .$promise
                .then( function (res) {
                  localStorage.setItem('token', JSON.stringify(res.token));
                  localStorage.setItem('user', JSON.stringify(res.user));
                  $state.go('tab.knowledge-list');
                }, function (err) {
                  console.log(err);
                  $location.path('/login');
                })
          }, function (err) {
            console.log(err);
          })

	    $state.go('tab.knowledge-list');
	  }
	}
]);

authControllers.controller('loginController', [
  '$scope',
  '$state',
  '$location',
  '$rootScope',
  'loginService',
  function(
    $scope,
    $state,
    $location,
    $rootScope,
    loginService
  )
  {
    $scope.user = {}

    $scope.login = function() {
    loginService.login($scope.user)
      .$promise
        .then( function (res) {
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('user', JSON.stringify(res.user));
          $state.go('tab.knowledge-list');
        },
        function (err) {
          console.log(err);
        })
    }
	}
]);

authControllers.controller('forgotPasswordController', [
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
