var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataController', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicPopover',
  '$rootScope',
  'dataService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicPopover,
    $rootScope,
    dataService
  )
  {
	  $scope.datas = dataService.list();
	  $scope.data = dataService.detail({id: $stateParams.id});

	  $scope.create = function () {
      $scope.data.user = $rootScope.currentUser.url
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
