var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataController', [
  '$scope',
  '$stateParams',
  '$state',
  'dataService',
  function(
    $scope,
    $stateParams,
    $state,
    dataService
  )
  {
	  $scope.datas = dataService.list();
	  $scope.data = dataService.detail({id: $stateParams.id});

	  $scope.create = function () {
	    dataService.create($scope.data);
	    $scope.datas = dataService.list();
	    $state.go('tab.data-list');
	  }

	  $scope.update = function () {
	    dataService.update($scope.data);
	    $scope.datas = dataService.list();
	    $state.go('tab.data-list');
	  }

	  $scope.delete = function () {
	    dataService.delete($scope.data);
	    $scope.datas = dataService.list();
	    $state.go('tab.data-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.data-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.datas = dataService.list();
	  })

	}
]);
