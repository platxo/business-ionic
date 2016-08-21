var informationControllers = angular.module('informationControllers', []);

informationControllers.controller('informationController', [
  '$scope',
  '$stateParams',
  '$state',
  'informationService',
  function(
    $scope,
    $stateParams,
    $state,
    informationService
  )
  {
	  $scope.informations = informationService.list();
	  $scope.information = informationService.detail({id: $stateParams.id});

	  $scope.create = function () {
	    informationService.create($scope.information);
	    $scope.informations = informationService.list();
	    $state.go('tab.information-list');
	  }

	  $scope.update = function () {
	    informationService.update($scope.information);
	    $scope.informations = informationService.list();
	    $state.go('tab.information-list');
	  }

	  $scope.delete = function () {
	    informationService.delete($scope.information);
	    $scope.informations = informationService.list();
	    $state.go('tab.information-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.information-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.informations = informationService.list();
	  })

	}
]);
