var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicModal',
  'dataService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicModal,
    dataService
  )
  {
	  $scope.datas = dataService.list();
	  $scope.data = dataService.detail({id: $stateParams.id});
    $scope.tags = {
      'Grey': 'grey',
      'Red':'red',
      'Yellow': 'yellow',
      'Blue': 'blue',
      'Orange': 'orange',
      'Green': 'green',
      'Purple': 'purple'
    };

	  $scope.create = function () {
      $scope.data.business = $rootScope.currentBusiness.id;
      $scope.data.owner = $rootScope.currentOwner.id;
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

    $scope.refresh = function () {
      $scope.datas = dataService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.datas = dataService.list();
	  })

	}
]);
