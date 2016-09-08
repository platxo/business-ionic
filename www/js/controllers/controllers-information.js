var informationControllers = angular.module('informationControllers', []);

informationControllers.controller('informationController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicModal',
  '$ionicPopover',
  'informationService',
  'dataService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicModal,
    $ionicPopover,
    informationService,
    dataService
  )
  {
	  $scope.informations = informationService.list();
	  $scope.information = informationService.detail({id: $stateParams.id});
    $scope.datas = dataService.list();
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
      $scope.information.business = $rootScope.currentBusiness
      $scope.information.owner = $rootScope.currentOwner
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

    $ionicModal.fromTemplateUrl('templates/information/select-data.html', {
      scope: $scope,
      controller: 'informationCotroller',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.dataModal = modal;
    });
    $scope.dataOpenModal = function() {
      $scope.dataModal.show();
    };
    $scope.dataCloseModal = function() {
      $scope.dataModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.dataModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('dataModal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('dataModal.removed', function() {
      // Execute action
    });

    $scope.information.datas = [];
    $scope.selectData = function(data) {

      $scope.information.data = data.name;
      $scope.information.datas.push(data.url);
    };

    $scope.menu = function($event) {
      $scope.popover.show($event);
    };
    $ionicPopover.fromTemplateUrl('templates/menu.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.refresh = function () {
      $scope.informations = informationService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.informations = informationService.list();
    })

	}
]);
