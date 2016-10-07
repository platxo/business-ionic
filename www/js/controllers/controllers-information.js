var informationControllers = angular.module('informationControllers', []);

informationControllers.controller('informationListCtrl', [
  '$scope',
  '$state',
  '$ionicLoading',
  'informationService',
  function(
    $scope,
    $state,
    $ionicLoading,
    informationService
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

    $scope.refresh = function () {
      $scope.informations = informationService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

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

informationControllers.controller('informationDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'informationService',
  'dataService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    informationService,
    dataService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    informationService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.information = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

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

	}
]);

informationControllers.controller('informationCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'informationService',
  'dataService',
  'tagsService',
  function(
    $scope,
    $rootScope,
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

    tagsService.get()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.tags = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.information = {}
    $scope.information.datas = [];

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

    $scope.selectData = function(data) {
      $scope.information.data = data.name;
      $scope.information.datas.push(data.id);
    };

    $ionicModal.fromTemplateUrl('templates/information/select-data.html', {
      scope: $scope,
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

    $scope.cancel = function () {
	    $state.go('tab.information-list');
	  }

	}
]);

informationControllers.controller('informationUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'informationService',
  'dataService',
  'tagsService',
  function(
    $scope,
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

    tagsService.get()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.tags = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    informationService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.information = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

	  $scope.update = function () {
	    informationService.update($scope.information)
        .$promise
          .then(function (res) {
            $state.go('tab.information-list');
          }, function (err) {

          })
	  }

    $scope.selectData = function(data) {
      $scope.information.data = data.name;
      $scope.information.datas.push(data.id);
    };

    $ionicModal.fromTemplateUrl('templates/information/select-data.html', {
      scope: $scope,
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

	  $scope.cancel = function () {
	    $state.go('tab.information-list');
	  }

	}
]);

informationControllers.controller('informationDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'informationService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    informationService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    informationService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.information = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

	  $scope.delete = function () {
      informationService.delete($scope.information)
      .$promise
        .then(function (res) {
          $state.go('tab.information-list');
        }, function (err) {

        })
    }

	  $scope.cancel = function () {
	    $state.go('tab.information-list');
	  }

  }
]);
