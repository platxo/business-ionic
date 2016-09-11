var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicPopover',
  'dataService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicPopover,
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
      $scope.data.owner = $rootScope.currentOwner;
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

    $ionicPopover.fromTemplateUrl('templates/menu.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.menu = function($event) {
      $scope.popover.show($event);
    };

    $scope.closeMenu = function() {
      $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.datas = dataService.list();
	  })

	}
]);
