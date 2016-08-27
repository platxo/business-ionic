var authControllers = angular.module('authControllers', []);

authControllers.controller('signupController', [
  '$scope',
  '$stateParams',
  '$state',
  'signupService',
  function(
    $scope,
    $stateParams,
    $state,
    signupService
  )
  {
    $scope.users = signupService.list();
    $scope.user = signupService.detail({id: $stateParams.id});

    $scope.signup = function () {
	    signupService.signup($scope.user);
	    $state.go('tab.knowledge-list');
	  }
	}
]);

authControllers.controller('loginController', [
  '$scope',
  '$stateParams',
  '$state',
  'loginService',
  function(
    $scope,
    $stateParams,
    $state,
    loginService
  )
  {
    //$scope.users = loginService.list();
    //$scope.user = loginService.detail({id: $stateParams.id});

    $scope.login = function(user) {
    console.log('Sign-In', user);
    loginService.login(user);
    $state.go('tab.knowledge-list');
    }
	}
]);

authControllers.controller('forgotPasswordController', [
  '$scope',
  '$stateParams',
  '$state',
  'forgotPasswordService',
  function(
    $scope,
    $stateParams,
    $state,
    forgotPasswordService
  )
  {


	}
]);
