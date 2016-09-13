var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicPopover',
  'businessService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicPopover,
    businessService
  )
  {
	  $scope.business = businessService.list();
	  $scope.bs = businessService.detail({id: $stateParams.id});

	  $scope.create = function () {
      $scope.bs.owner = $rootScope.currentOwner
      $scope.bs.employees = []
      $scope.bs.customers = []
      $scope.bs.suppliers = []
	    businessService.create($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.update = function () {
	    businessService.update($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.delete = function () {
	    businessService.delete($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.cancel = function () {
	    $state.go('business-list');
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

    $scope.refresh = function () {
      $scope.business = businessService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.business = businessService.list();
	  })

    $scope.selectBusiness = function(bs) {
      window.localStorage.setItem('bs', JSON.stringify(bs));
      $state.go('tab.knowledge-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
	    $scope.business = businessService.list();
	  })

	}
]);
