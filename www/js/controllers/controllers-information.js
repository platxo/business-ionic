var informationControllers = angular.module('informationControllers', []);

informationControllers.controller('informationController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$timeout',
  '$ionicModal',
  'informationService',
  'dataService',
  'tagsService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $timeout,
    $ionicModal,
    informationService,
    dataService,
    tagsService
  )
  {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });

	  $scope.informations = informationService.list()
      .$promise
        .then(function (res) {
          $scope.informations = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          });
          $timeout(function() {
             $ionicLoading.hide();
          }, 2000);
        })

	  $scope.information = informationService.detail({id: $stateParams.id});
    $scope.datas = dataService.list();
    $scope.tags = tagsService.get()

	  $scope.create = function () {
      $scope.information.business = $rootScope.currentBusiness.id;
      $scope.information.owner = $rootScope.currentOwner.id;
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

    $scope.information.datas = [];
    $scope.selectData = function(data) {
      $scope.information.data = data.name;
      $scope.information.datas.push(data.id);
    };

	  $scope.cancel = function () {
	    $state.go('tab.information-list');
	  }

    $scope.refresh = function () {
      $scope.informations = informationService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicModal.fromTemplateUrl('templates/information/select-data.html', {
      scope: $scope,
      controller: 'informationCotroller',
      animation: 'slide-in-up',
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

    $scope.$on('$stateChangeSuccess', function() {
      $scope.informations = informationService.list();
    })

	}
]);
