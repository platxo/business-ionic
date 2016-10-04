var informationControllers = angular.module('informationControllers', []);

informationControllers.controller('informationController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
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
    $ionicModal,
    informationService,
    dataService,
    tagsService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

	  informationService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.informations = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.information = informationService.detail({id: $stateParams.id})

    dataService.list()
      .$promise
        .then(function (res) {
          $scope.datas = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    tagsService.get()
      .$promise
        .then(function (res) {
          $scope.tags = res
        }, function (err) {

        })

	  $scope.create = function () {
      $scope.information.business = $rootScope.currentBusiness.id;
      $scope.information.owner = $rootScope.currentOwner.id;
	    informationService.create($scope.information)
      .$promise
        .then(function (res) {
          $state.go('tab.information-list');
        }, function (err) {

        })
	  }

	  $scope.update = function () {
	    informationService.update($scope.information)
      .$promise
        .then(function (res) {
          $state.go('tab.information-list');
        }, function (err) {

        })
	  }

	  $scope.delete = function () {
	    informationService.delete($scope.information)
      .$promise
        .then(function (res) {
          $state.go('tab.information-list');
        }, function (err) {

        })
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
      informationService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.informations = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })
    })

	}
]);
